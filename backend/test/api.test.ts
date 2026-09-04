import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5000';

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  return { status: res.status, ok: res.ok, data };
}

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    throw new Error(msg);
  }
  console.log(`✅ PASSED: ${msg}`);
}

async function runTests() {
  console.log('\n=============================================');
  console.log('🧪 RUNNING COMPREHENSIVE BACKEND API TEST SUITE');
  console.log('=============================================\n');

  // 1. Healthcheck
  const health = await request('/health');
  assert(health.status === 200 && health.data.status === 'ok', 'GET /health returns 200 and ok status');

  // 2. Departments
  const depts = await request('/departments');
  assert(depts.status === 200 && Array.isArray(depts.data) && depts.data.length === 7, 'GET /departments returns 7 departments');
  assert(depts.data.includes('Campus Maintenance & Electricals'), 'Departments list contains Campus Maintenance & Electricals');

  // 3. Branches
  const branches = await request('/branches');
  assert(branches.status === 200 && Array.isArray(branches.data) && branches.data.length === 3, 'GET /branches returns 3 branches');
  assert(branches.data.includes('Computer Science & Engineering'), 'Branches list contains Computer Science & Engineering');

  // 4. Auth - Login Tests
  console.log('\n--- Testing Authentication & RBAC Login ---');
  
  // 4.1 Missing fields
  const loginMissing = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'aarav.mehta@campus.edu' }),
  });
  assert(loginMissing.status === 400, 'POST /auth/login fails with 400 when password/role missing');

  // 4.2 Invalid password
  const loginBadPass = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'aarav.mehta@campus.edu',
      password: 'wrongpassword',
      role: 'student',
    }),
  });
  assert(loginBadPass.status === 401, 'POST /auth/login fails with 401 on wrong password');

  // 4.3 Role mismatch
  const loginRoleMismatch = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'aarav.mehta@campus.edu',
      password: 'password123',
      role: 'admin',
    }),
  });
  assert(loginRoleMismatch.status === 403, 'POST /auth/login fails with 403 on role mismatch');

  // 4.4 Valid Student Login
  const studentLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'aarav.mehta@campus.edu',
      password: 'password123',
      role: 'student',
    }),
  });
  assert(studentLogin.status === 200 && Boolean(studentLogin.data.token), 'Student login succeeds and yields JWT token');
  const studentToken = studentLogin.data.token;
  assert(studentLogin.data.user.email === 'aarav.mehta@campus.edu', 'Student login returns user profile');

  // 4.5 Valid Staff Login
  const staffLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'rajesh.maint@campus.edu',
      password: 'password123',
      role: 'staff',
    }),
  });
  assert(staffLogin.status === 200 && Boolean(staffLogin.data.token), 'Staff login succeeds and yields JWT token');
  const staffToken = staffLogin.data.token;
  assert(staffLogin.data.user.department === 'Campus Maintenance & Electricals', 'Staff user has correct department');

  // 4.6 Valid Admin Login
  const adminLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'dean.studentaffairs@campus.edu',
      password: 'password123',
      role: 'admin',
    }),
  });
  assert(adminLogin.status === 200 && Boolean(adminLogin.data.token), 'Admin login succeeds and yields JWT token');
  const adminToken = adminLogin.data.token;

  // 5. User Profile GET /users/me
  console.log('\n--- Testing User Profile ---');
  const meNoAuth = await request('/users/me');
  assert(meNoAuth.status === 401, 'GET /users/me fails with 401 when no token is provided');

  const meStudent = await request('/users/me', {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  assert(meStudent.status === 200 && meStudent.data.name === 'Aarav Mehta', 'GET /users/me returns authenticated student profile');

  // 6. Complaints List & RBAC
  console.log('\n--- Testing Complaints List & RBAC Filtering ---');
  
  // 6.1 Student only sees own complaints
  const studentComplaints = await request('/complaints', {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  assert(studentComplaints.status === 200 && Array.isArray(studentComplaints.data), 'Student can fetch complaints');
  const allOwn = studentComplaints.data.every((c: any) => c.studentEmail === 'aarav.mehta@campus.edu');
  assert(allOwn, 'RBAC check: Student sees ONLY complaints filed by their own account');

  // 6.2 Staff only sees department complaints
  const staffComplaints = await request('/complaints', {
    headers: { Authorization: `Bearer ${staffToken}` },
  });
  assert(staffComplaints.status === 200, 'Staff can fetch complaints');
  const allDept = staffComplaints.data.every((c: any) => c.department === 'Campus Maintenance & Electricals');
  assert(allDept, 'RBAC check: Staff sees ONLY complaints in their assigned department');

  // 6.3 Admin sees all complaints
  const adminComplaints = await request('/complaints', {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  assert(adminComplaints.status === 200, 'Admin can fetch all complaints');
  assert(adminComplaints.data.length >= 6, 'RBAC check: Admin sees complete cross-department ledger');

  // 7. Submit Complaint POST /complaints
  console.log('\n--- Testing Complaint Creation ---');
  const newComplaintPayload = {
    category: 'water',
    title: 'Water tap leaking heavily in 2nd floor restroom',
    description: 'Continuous leaking from washroom tap causing water overflow onto walkway.',
    block: 'Block C (Charaka)',
    roomNo: 'Washroom 2B',
    priority: 'high',
    urgency: 'high',
    photos: ['https://images.unsplash.com/photo-1541888946425-d0fbb18086f6'],
    studentName: 'Aarav Mehta',
    studentRoll: '2023CSB1042',
    studentEmail: 'aarav.mehta@campus.edu',
    branch: 'Computer Science & Engineering',
  };

  const createRes = await request('/complaints', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify(newComplaintPayload),
  });
  assert(createRes.status === 201, 'POST /complaints successfully creates a complaint (201 Created)');
  assert(createRes.data.status === 'pending', 'Created complaint has default status "pending"');
  assert(createRes.data.ticketNumber.startsWith('No. '), 'Created complaint generates ticketNumber');
  assert(createRes.data.timeline.length > 0, 'Created complaint automatically generates initial timeline event');
  assert(createRes.data.comments.length > 0, 'Created complaint automatically generates initial comment');
  const createdTicketId = createRes.data.id;

  // 8. Complaint Details & RBAC Enforcement
  console.log('\n--- Testing Complaint Details & Access Restrictions ---');
  const getCreated = await request(`/complaints/${createdTicketId}`, {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  assert(getCreated.status === 200 && getCreated.data.id === createdTicketId, 'Student can retrieve their newly created complaint details');

  // Student trying to read Priya's complaint TCK-280
  const studentUnauthorizedGet = await request('/complaints/TCK-280', {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  assert(studentUnauthorizedGet.status === 403, 'RBAC check: Student is blocked (403 Forbidden) from accessing another student\'s complaint');

  // 9. Update Complaint PATCH /complaints/:id
  console.log('\n--- Testing Complaint Updates, Assignment & Comments ---');

  // 9.1 Student adding comment
  const studentComment = await request(`/complaints/${createdTicketId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify({
      comment: {
        author: 'Aarav Mehta',
        authorRole: 'student',
        text: 'Adding follow-up note: maintenance staff is requested to bring spare washers.',
      },
    }),
  });
  assert(studentComment.status === 200, 'Student can add a comment to their own complaint');
  const hasStudentComment = studentComment.data.comments.some((cm: any) =>
    cm.text.includes('spare washers')
  );
  assert(hasStudentComment, 'Comment persists in database comments array');

  // 9.2 Student forbidden from changing status
  const studentForbiddenStatus = await request(`/complaints/${createdTicketId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify({ status: 'resolved' }),
  });
  assert(studentForbiddenStatus.status === 403, 'RBAC check: Student is forbidden (403) from updating status');

  // 9.3 Staff / Admin assigning staff and updating status
  const staffUpdate = await request(`/complaints/${createdTicketId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({
      status: 'in_review',
      assignedStaff: 'Ramesh Plumber',
      remark: 'Dispatched emergency plumbing crew with replacement valve.',
    }),
  });
  assert(staffUpdate.status === 200 && staffUpdate.data.status === 'in_review', 'Admin/Staff can update status to in_review');
  assert(staffUpdate.data.assignedStaff === 'Ramesh Plumber', 'Staff assignment persists');
  const hasTimelineUpdate = staffUpdate.data.timeline.some((tl: any) =>
    tl.title.includes('In Review') || tl.description.includes('plumbing crew')
  );
  assert(hasTimelineUpdate, 'Status update creates corresponding timeline event');

  // 10. Dashboard Statistics
  console.log('\n--- Testing Dashboard Statistics ---');
  const statsRes = await request('/dashboard/stats', {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  assert(statsRes.status === 200, 'GET /dashboard/stats returns 200');
  assert(typeof statsRes.data.total === 'number' && statsRes.data.total > 0, 'Dashboard stats calculates total from PostgreSQL');
  assert(statsRes.data.byStatus.in_review > 0, 'Dashboard stats accurately aggregates byStatus');
  assert(typeof statsRes.data.byCategory.water === 'number', 'Dashboard stats accurately aggregates byCategory');
  assert(typeof statsRes.data.byPriority.high === 'number', 'Dashboard stats accurately aggregates byPriority');

  // 11. Notifications
  console.log('\n--- Testing Notifications ---');
  const notifRes = await request('/notifications', {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  assert(notifRes.status === 200 && Array.isArray(notifRes.data), 'GET /notifications returns array of notifications');
  assert(notifRes.data.length > 0, 'Notifications seeded from database are present');

  // 12. File Uploads POST /uploads
  console.log('\n--- Testing File Uploads ---');
  const dummyFilePath = path.resolve(__dirname, 'test-photo.jpg');
  fs.writeFileSync(dummyFilePath, 'dummy-photo-binary-content-test');

  const formData = new FormData();
  const blob = new Blob([fs.readFileSync(dummyFilePath)], { type: 'image/jpeg' });
  formData.append('file', blob, 'test-photo.jpg');

  const uploadRes = await fetch(`${BASE_URL}/uploads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: formData,
  });
  const uploadData = await uploadRes.json();
  assert(uploadRes.status === 200 && Array.isArray(uploadData.urls) && uploadData.urls.length > 0, 'POST /uploads returns array of uploaded file URLs');
  assert(uploadData.urls[0].includes('/uploads/'), 'Uploaded file URL is correctly mapped');

  // Clean up dummy test file
  if (fs.existsSync(dummyFilePath)) {
    fs.unlinkSync(dummyFilePath);
  }

  console.log('\n=============================================');
  console.log('🎉 ALL BACKEND API & RBAC TESTS PASSED 100%!');
  console.log('=============================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
