// src/app/dashboard/page.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';

type Role = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
type Module = { id: string; title: string; position: number; lessons: Lesson[] };
type Lesson = { id: string; title: string; type: string; position: number };
type Instructor = { id: string; name: string; email: string };
type Enrollment = { id: string; user: { name: string; email: string }; course: { title: string } };
type Progress = { id: string; lesson: { title: string }; progress: number; completed: boolean };
type Certificate = { id: string; user: { name: string }; course: { title: string }; issuedAt: string };
type PaymentEntry = {
  id: string;
  amountCents: number;
  currency: string;
  provider: string;
  providerRef?: string;
  user: { name: string; email: string };
  course?: { title?: string };
};
type CourseListItem = { id: string; title: string; status: string; instructors?: Instructor[] };

const roleTabs: Record<Role, { key: string; label: string }[]> = {
  ADMIN: [
    { key: 'overview', label: 'Overview' },
    { key: 'courses', label: 'Courses' },
    { key: 'instructors', label: 'Instructors' },
    { key: 'students', label: 'Students' },
    { key: 'payments', label: 'Payments' },
    { key: 'content', label: 'Content' },
  ],
  INSTRUCTOR: [
    { key: 'overview', label: 'Overview' },
    { key: 'courses', label: 'My Courses' },
    { key: 'students', label: 'My Students' },
    { key: 'content', label: 'Content' },
  ],
  STUDENT: [
    { key: 'overview', label: 'Overview' },
    { key: 'courses', label: 'My Courses' },
    { key: 'progress', label: 'Progress' },
    { key: 'certificates', label: 'Certificates' },
    { key: 'payments', label: 'Payments' },
  ],
};

export default function DashboardPage() {
  const [role, setRole] = useState<Role>('ADMIN');
  const [activeTab, setActiveTab] = useState(roleTabs[role][0].key);
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseStatus, setNewCourseStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newCourseAccessType, setNewCourseAccessType] = useState<'FREE' | 'PAID' | 'SUBSCRIPTION'>('FREE');
  const [newCoursePriceCents, setNewCoursePriceCents] = useState<number | ''>('');
  const [newCourseCurrency, setNewCourseCurrency] = useState('USD');
  const [courseError, setCourseError] = useState('');
  const [courseSuccess, setCourseSuccess] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    title: string;
    modules: Module[];
    instructors?: Instructor[];
  } | null>(null);
  const [loadingCourseDetail, setLoadingCourseDetail] = useState(false);

  const [moduleTitle, setModuleTitle] = useState('');
  const [modulePosition, setModulePosition] = useState(1);
  const [lessonModuleId, setLessonModuleId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'VIDEO' | 'TEXT' | 'PDF' | 'QUIZ' | 'ASSIGNMENT'>('VIDEO');
  const [lessonPosition, setLessonPosition] = useState(1);
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonPdfUrl, setLessonPdfUrl] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonReleaseAt, setLessonReleaseAt] = useState('');

  const [courseAccessType, setCourseAccessType] = useState<'FREE' | 'PAID' | 'SUBSCRIPTION'>('FREE');
  const [coursePriceCents, setCoursePriceCents] = useState<number | ''>('');
  const [courseCurrency, setCourseCurrency] = useState('USD');

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState('');
  const [students, setStudents] = useState<Instructor[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const [editModuleId, setEditModuleId] = useState<string | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editModulePosition, setEditModulePosition] = useState(1);

  const [editLessonId, setEditLessonId] = useState<string | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonType, setEditLessonType] = useState<'VIDEO' | 'TEXT' | 'PDF' | 'QUIZ' | 'ASSIGNMENT'>('VIDEO');
  const [editLessonPosition, setEditLessonPosition] = useState(1);
  const [editLessonVideoUrl, setEditLessonVideoUrl] = useState('');
  const [editLessonPdfUrl, setEditLessonPdfUrl] = useState('');
  const [editLessonContent, setEditLessonContent] = useState('');
  const [editLessonReleaseAt, setEditLessonReleaseAt] = useState('');

  const [studentEnrollments, setStudentEnrollments] = useState<Enrollment[]>([]);
  const [studentProgress, setStudentProgress] = useState<Progress[]>([]);
  const [loadingStudentData, setLoadingStudentData] = useState(false);
  const [studentCertificates, setStudentCertificates] = useState<Certificate[]>([]);
  const [courseEnrollments, setCourseEnrollments] = useState<Enrollment[]>([]);
  const [instructorCourseId, setInstructorCourseId] = useState('');
  const [instructorEnrollments, setInstructorEnrollments] = useState<Enrollment[]>([]);
  const [payments, setPayments] = useState<PaymentEntry[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [manualAmount, setManualAmount] = useState('');
  const [manualCurrency, setManualCurrency] = useState('USD');
  const [manualProvider, setManualProvider] = useState<'STRIPE' | 'LOCAL'>('LOCAL');
  const [paymentUserId, setPaymentUserId] = useState('');
  const [stripeClientSecret, setStripeClientSecret] = useState('');
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [paymentListError, setPaymentListError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');

  const tabs = useMemo(() => roleTabs[role], [role]);

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    setActiveTab(roleTabs[nextRole][0].key);
  };

  const fetchCourses = useCallback(async () => {
    setLoadingCourses(true);
    setCourseError('');
    try {
      const response = await fetch('/api/lms/courses');
      if (!response.ok) {
        throw new Error('Failed to load courses');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid course payload');
      }
      setCourses(data.map((course) => ({
        id: course.id,
        title: course.title,
        status: course.status,
        instructors: course.instructors?.map((item: { user: Instructor }) => item.user) || [],
      })));
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to load courses');
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  const handleCreateCourse = async () => {
    if (!newCourseTitle.trim()) {
      setCourseError('Course title is required.');
      return;
    }
    if (!newCourseDescription.trim()) {
      setCourseError('Course description is required.');
      return;
    }
    if (newCourseAccessType !== 'FREE' && !newCoursePriceCents) {
      setCourseError('Price is required for paid or subscription courses.');
      return;
    }
    setCourseError('');
    setCourseSuccess('');

    const slug = newCourseTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    try {
      const response = await fetch('/api/lms/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newCourseTitle.trim(),
          slug,
          description: newCourseDescription.trim(),
          status: newCourseStatus,
          accessType: newCourseAccessType,
          priceCents: newCourseAccessType === 'FREE' ? undefined : newCoursePriceCents,
          currency: newCourseAccessType === 'FREE' ? undefined : newCourseCurrency,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to create course');
      }

      setCourseSuccess('Course created successfully.');
      setNewCourseTitle('');
      setNewCourseDescription('');
      setNewCourseStatus('DRAFT');
      setNewCourseAccessType('FREE');
      setNewCoursePriceCents('');
      setNewCourseCurrency('USD');
      fetchCourses();
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to create course');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch(`/api/lms/courses/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to delete course');
      }
      setCourseSuccess('Course deleted.');
      fetchCourses();
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to delete course');
    }
  };

  const fetchCourseDetail = useCallback(
    async (courseId: string) => {
      setLoadingCourseDetail(true);
      setCourseError('');
      try {
        const response = await fetch(`/api/lms/courses/${courseId}`);
      if (!response.ok) {
        throw new Error('Failed to load course');
      }
      const data = await response.json();
      setSelectedCourse({
        id: data.id,
        title: data.title,
        modules: data.modules || [],
        instructors: data.instructors?.map((item: { user: Instructor }) => item.user) || [],
      });
      setCourseAccessType(data.accessType || 'FREE');
      setCoursePriceCents(data.priceCents ?? '');
      setCourseCurrency(data.currency || 'USD');
      if (!lessonModuleId && data.modules?.length) {
        setLessonModuleId(data.modules[0].id);
      }
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to load course');
    } finally {
      setLoadingCourseDetail(false);
    }
    },
    [lessonModuleId]
  );

  const fetchInstructors = useCallback(async () => {
    try {
      const response = await fetch('/api/lms/instructors');
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data)) {
        setInstructors(data);
        if (!selectedInstructorId && data.length) {
          setSelectedInstructorId(data[0].id);
        }
      }
    } catch {
      // ignore for now
    }
  }, [selectedInstructorId]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch('/api/lms/students');
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(data);
        if (!selectedStudentId && data.length) {
          setSelectedStudentId(data[0].id);
        }
      }
    } catch {
      // ignore for now
    }
  }, [selectedStudentId]);

  const fetchPayments = useCallback(async (query = '') => {
    setLoadingPayments(true);
    setPaymentListError('');
    try {
      const response = await fetch(`/api/lms/payments${query}`);
      if (!response.ok) {
        throw new Error('Failed to load payments');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid payment data');
      }
      setPayments(data);
    } catch (err: unknown) {
      setPaymentListError((err as Error)?.message || 'Failed to load payments');
    } finally {
      setLoadingPayments(false);
    }
  }, []);

  const handleCreateModule = async () => {
    if (!selectedCourseId) return;
    if (!moduleTitle.trim()) {
      setCourseError('Module title is required.');
      return;
    }
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch('/api/lms/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourseId,
          title: moduleTitle.trim(),
          position: modulePosition,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to create module');
      }
      setModuleTitle('');
      setModulePosition(modulePosition + 1);
      fetchCourseDetail(selectedCourseId);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to create module');
    }
  };

  const handleCreateLesson = async () => {
    if (!lessonModuleId) {
      setCourseError('Select a module for this lesson.');
      return;
    }
    if (!lessonTitle.trim()) {
      setCourseError('Lesson title is required.');
      return;
    }
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch('/api/lms/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: lessonModuleId,
          title: lessonTitle.trim(),
          type: lessonType,
          position: lessonPosition,
          videoUrl: lessonType === 'VIDEO' ? lessonVideoUrl : undefined,
          pdfUrl: lessonType === 'PDF' ? lessonPdfUrl : undefined,
          content: lessonType === 'TEXT' ? lessonContent : undefined,
          releaseAt: lessonReleaseAt ? new Date(lessonReleaseAt).toISOString() : undefined,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to create lesson');
      }
      setLessonTitle('');
      setLessonPosition(lessonPosition + 1);
      setLessonVideoUrl('');
      setLessonPdfUrl('');
      setLessonContent('');
      setLessonReleaseAt('');
      if (selectedCourseId) fetchCourseDetail(selectedCourseId);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to create lesson');
    }
  };

  const handleUpdateCourseAccess = async () => {
    if (!selectedCourseId) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const payload: Record<string, unknown> = {
        accessType: courseAccessType,
      };
      if (courseAccessType !== 'FREE') {
        if (coursePriceCents) payload.priceCents = coursePriceCents;
        if (courseCurrency) payload.currency = courseCurrency;
      }
      const response = await fetch(`/api/lms/courses/${selectedCourseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to update course');
      }
      setCourseSuccess('Course settings updated.');
      fetchCourseDetail(selectedCourseId);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to update course');
    }
  };

  const handleAssignInstructor = async () => {
    if (!selectedCourseId || !selectedInstructorId) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch(`/api/lms/courses/${selectedCourseId}/instructors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedInstructorId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to assign instructor');
      }
      setCourseSuccess('Instructor assigned.');
      fetchCourseDetail(selectedCourseId);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to assign instructor');
    }
  };

  const handleRemoveInstructor = async (userId: string) => {
    if (!selectedCourseId) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch(`/api/lms/courses/${selectedCourseId}/instructors`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to remove instructor');
      }
      setCourseSuccess('Instructor removed.');
      fetchCourseDetail(selectedCourseId);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to remove instructor');
    }
  };

  const handleEditModule = (mod: Module) => {
    setEditModuleId(mod.id);
    setEditModuleTitle(mod.title);
    setEditModulePosition(mod.position);
  };

  const handleUpdateModule = async () => {
    if (!editModuleId) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch(`/api/lms/modules/${editModuleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editModuleTitle.trim(),
          position: editModulePosition,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to update module');
      }
      setEditModuleId(null);
      fetchCourseDetail(selectedCourseId!);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to update module');
    }
  };

  const handleDeleteModule = async (id: string) => {
    if (!confirm('Delete this module?')) return;
    try {
      const response = await fetch(`/api/lms/modules/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to delete module');
      }
      fetchCourseDetail(selectedCourseId!);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to delete module');
    }
  };

  const handleEditLesson = async (lesson: Lesson) => {
    setEditLessonId(lesson.id);
    setEditLessonTitle(lesson.title);
    setEditLessonType(lesson.type as 'VIDEO' | 'TEXT' | 'PDF' | 'QUIZ' | 'ASSIGNMENT');
    setEditLessonPosition(lesson.position);
    setEditLessonVideoUrl('');
    setEditLessonPdfUrl('');
    setEditLessonContent('');
    setEditLessonReleaseAt('');
    try {
      const response = await fetch(`/api/lms/lessons/${lesson.id}`);
      if (!response.ok) return;
      const data = await response.json();
      setEditLessonVideoUrl(data.videoUrl || '');
      setEditLessonPdfUrl(data.pdfUrl || '');
      setEditLessonContent(data.content || '');
      setEditLessonReleaseAt(data.releaseAt ? data.releaseAt.slice(0, 16) : '');
    } catch {
      // ignore
    }
  };

  const handleUpdateLesson = async () => {
    if (!editLessonId) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch(`/api/lms/lessons/${editLessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editLessonTitle.trim(),
          type: editLessonType,
          position: editLessonPosition,
          videoUrl: editLessonType === 'VIDEO' ? editLessonVideoUrl : undefined,
          pdfUrl: editLessonType === 'PDF' ? editLessonPdfUrl : undefined,
          content: editLessonType === 'TEXT' ? editLessonContent : undefined,
          releaseAt: editLessonReleaseAt ? new Date(editLessonReleaseAt).toISOString() : undefined,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to update lesson');
      }
      setEditLessonId(null);
      fetchCourseDetail(selectedCourseId!);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to update lesson');
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (!confirm('Delete this lesson?')) return;
    try {
      const response = await fetch(`/api/lms/lessons/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to delete lesson');
      }
      fetchCourseDetail(selectedCourseId!);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to delete lesson');
    }
  };

  const fetchStudentData = useCallback(async () => {
    setLoadingStudentData(true);
    try {
      const userParam = selectedStudentId ? `?userId=${selectedStudentId}` : '';
      const enrollmentsRes = await fetch(`/api/lms/enrollments${userParam}`);
      const progressRes = await fetch(`/api/lms/progress${userParam}`);
      const certsRes = await fetch(`/api/lms/certificates${userParam}`);
      const enrollmentsData = enrollmentsRes.ok ? await enrollmentsRes.json() : [];
      const progressData = progressRes.ok ? await progressRes.json() : [];
      const certsData = certsRes.ok ? await certsRes.json() : [];
      setStudentEnrollments(Array.isArray(enrollmentsData) ? enrollmentsData : []);
      setStudentProgress(Array.isArray(progressData) ? progressData : []);
      setStudentCertificates(Array.isArray(certsData) ? certsData : []);
    } catch {
      setStudentEnrollments([]);
      setStudentProgress([]);
      setStudentCertificates([]);
    } finally {
      setLoadingStudentData(false);
    }
  }, [selectedStudentId]);

  const fetchInstructorEnrollments = async (courseId: string) => {
    try {
      const response = await fetch(`/api/lms/enrollments?courseId=${courseId}`);
      if (!response.ok) return;
      const data = await response.json();
      setInstructorEnrollments(Array.isArray(data) ? data : []);
    } catch {
      setInstructorEnrollments([]);
    }
  };

  const fetchCourseEnrollments = useCallback(async (courseId: string) => {
    try {
      const response = await fetch(`/api/lms/enrollments?courseId=${courseId}`);
      if (!response.ok) return;
      const data = await response.json();
      setCourseEnrollments(Array.isArray(data) ? data : []);
    } catch {
      setCourseEnrollments([]);
    }
  }, []);

  const handleEnrollStudent = async () => {
    if (!selectedCourseId || !selectedStudentId) return;
    setCourseError('');
    setCourseSuccess('');
    try {
      const response = await fetch('/api/lms/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedStudentId, courseId: selectedCourseId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to enroll student');
      }
      setCourseSuccess('Student enrolled.');
      fetchCourseEnrollments(selectedCourseId);
    } catch (err: unknown) {
      setCourseError((err as Error)?.message || 'Failed to enroll student');
    }
  };

  const createCertificateHtml = (studentName: string, courseTitle: string) => {
    return `
      <div style="font-family: 'Inter', sans-serif; text-align: center; padding: 40px; border: 6px solid #0b3b5b;">
        <div style="font-size: 18px; text-transform: uppercase; letter-spacing: 4px; color: #0ea5e9;">Certificate of Completion</div>
        <div style="margin-top: 24px; font-size: 42px; font-weight: 700; color: #0f172a;">${studentName}</div>
        <div style="margin-top: 12px; font-size: 18px; color: #475569;">has successfully completed</div>
        <div style="margin-top: 12px; font-size: 28px; font-weight: 600; color: #0f172a;">${courseTitle}</div>
        <div style="margin-top: 24px; font-size: 14px; color: #64748b;">Issued by Action Digital Institute on ${new Date().toLocaleDateString()}</div>
      </div>
    `;
  };

  const handleManualPayment = async () => {
    if (!paymentUserId || !manualAmount) {
      setPaymentSuccess('');
      setPaymentListError('Select a user and amount.');
      return;
    }
    setPaymentListError('');
    setPaymentSuccess('');
    try {
      const response = await fetch('/api/lms/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: paymentUserId,
          courseId: selectedCourseId,
          amountCents: Number(manualAmount),
          currency: manualCurrency,
          provider: manualProvider,
          providerRef: manualProvider === 'LOCAL' ? 'manual-entry' : undefined,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to record payment');
      }
      setPaymentSuccess('Payment recorded.');
      setManualAmount('');
      fetchPayments(role === 'STUDENT' && selectedStudentId ? `?userId=${selectedStudentId}` : '');
    } catch (err: unknown) {
      setPaymentListError((err as Error)?.message || 'Failed to record payment');
    }
  };

  const handleStripeIntent = async () => {
    if (!paymentUserId || !manualAmount) {
      setPaymentListError('Select a user and amount to create intent.');
      return;
    }
    setLoadingStripe(true);
    setPaymentListError('');
    setStripeClientSecret('');
    try {
      const response = await fetch('/api/payments/stripe/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: paymentUserId,
          courseId: selectedCourseId,
          amountCents: Number(manualAmount),
          currency: manualCurrency,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to create payment intent');
      }
      const data = await response.json();
      setStripeClientSecret(data.clientSecret);
      setPaymentSuccess('Stripe client secret generated. Complete payment on client.');
    } catch (err: unknown) {
      setPaymentListError((err as Error)?.message || 'Failed to create Stripe intent');
    } finally {
      setLoadingStripe(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'courses') {
      fetchCourses();
    }
  }, [activeTab, fetchCourses]);

  useEffect(() => {
    if (selectedCourseId) {
      fetchCourseDetail(selectedCourseId);
      fetchCourseEnrollments(selectedCourseId);
    }
  }, [selectedCourseId, fetchCourseDetail, fetchCourseEnrollments]);

  useEffect(() => {
    if (activeTab === 'courses') {
      fetchInstructors();
      fetchStudents();
    }
  }, [activeTab, fetchInstructors, fetchStudents]);

  useEffect(() => {
    if (students.length > 0 && !paymentUserId) {
      setPaymentUserId(students[0].id);
    }
  }, [students, paymentUserId]);

  useEffect(() => {
    if (role === 'STUDENT' && (activeTab === 'courses' || activeTab === 'progress' || activeTab === 'certificates')) {
      fetchStudentData();
    }
  }, [role, activeTab, fetchStudentData, selectedStudentId]);

  useEffect(() => {
    if (activeTab === 'payments') {
      const userFilter = role === 'STUDENT' && selectedStudentId ? `?userId=${selectedStudentId}` : '';
      fetchPayments(userFilter);
    }
  }, [activeTab, role, selectedStudentId, fetchPayments]);

  const handleIssueCertificate = async () => {
    if (!selectedCourseId || !selectedStudentId) {
      setCertificateError('Select a student and course first.');
      return;
    }
    const student = students.find((s) => s.id === selectedStudentId);
    const course = courses.find((c) => c.id === selectedCourseId);
    if (!student || !course) {
      setCertificateError('Invalid student or course selected.');
      return;
    }
    setCertificateError('');
    setCertificateSuccess('');
    try {
      const html = createCertificateHtml(student.name, course.title);
      const response = await fetch('/api/lms/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: student.id,
          courseId: course.id,
          html,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to issue certificate');
      }
      setCertificateSuccess('Certificate issued.');
      fetchStudentData();
    } catch (err: unknown) {
      setCertificateError((err as Error)?.message || 'Failed to issue certificate');
    }
  };

  return (
    <AnimatedPageWrapper>
      <section className="min-h-screen section py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
              <p className="text-secondary mt-2">
                Single dashboard view with role-based access. Replace role selector with real auth.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-secondary">Role</label>
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                className="input min-w-[180px]"
              >
                <option value="ADMIN">Admin</option>
                <option value="INSTRUCTOR">Instructor</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-b border-default pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary-gradient text-white'
                    : 'bg-default text-secondary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="glass-card card p-6">
              <h2 className="text-lg font-semibold text-primary">Key Metrics</h2>
              <div className="mt-4 space-y-3 text-secondary text-sm">
                <div>Active Students: 1,245</div>
                <div>Monthly Enrollments: 186</div>
                <div>Completion Rate: 72%</div>
              </div>
            </div>
            <div className="glass-card card p-6">
              <h2 className="text-lg font-semibold text-primary">Revenue Snapshot</h2>
              <div className="mt-4 space-y-3 text-secondary text-sm">
                <div>Paid Courses: 42</div>
                <div>Subscriptions: 68</div>
                <div>Monthly Revenue: $8,430</div>
              </div>
            </div>
            <div className="glass-card card p-6">
              <h2 className="text-lg font-semibold text-primary">Action Items</h2>
              <div className="mt-4 space-y-3 text-secondary text-sm">
                <div>3 courses waiting review</div>
                <div>12 assignments pending</div>
                <div>5 support requests</div>
              </div>
            </div>
          </div>

          <div className="mt-10 glass-card card p-6">
            <h2 className="text-xl font-semibold text-primary capitalize">{activeTab}</h2>
            {activeTab === 'courses' && role === 'ADMIN' ? (
              <div className="mt-4 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">Create Course</h3>
                  {courseError ? (
                    <div className="text-sm text-red-500">{courseError}</div>
                  ) : null}
                  {courseSuccess ? (
                    <div className="text-sm text-green-500">{courseSuccess}</div>
                  ) : null}
                          <div className="flex flex-col gap-3">
                            <input
                              value={newCourseTitle}
                              onChange={(e) => setNewCourseTitle(e.target.value)}
                              placeholder="Course title"
                              className="input flex-1"
                            />
                            <textarea
                              value={newCourseDescription}
                              onChange={(e) => setNewCourseDescription(e.target.value)}
                              placeholder="Course description"
                              className="input"
                              rows={3}
                            />
                            <div className="flex flex-col gap-3 md:flex-row">
                              <select
                                value={newCourseStatus}
                                onChange={(e) => setNewCourseStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                                className="input md:w-48"
                              >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                              </select>
                              <select
                                value={newCourseAccessType}
                                onChange={(e) =>
                                  setNewCourseAccessType(e.target.value as 'FREE' | 'PAID' | 'SUBSCRIPTION')
                                }
                                className="input md:w-56"
                              >
                                <option value="FREE">Free</option>
                                <option value="PAID">Paid (one-time)</option>
                                <option value="SUBSCRIPTION">Subscription</option>
                              </select>
                              <input
                                type="number"
                                min={0}
                                value={newCoursePriceCents}
                                onChange={(e) => setNewCoursePriceCents(e.target.value ? Number(e.target.value) : '')}
                                placeholder="Price (cents)"
                                className="input md:w-48"
                                disabled={newCourseAccessType === 'FREE'}
                              />
                              <input
                                value={newCourseCurrency}
                                onChange={(e) => setNewCourseCurrency(e.target.value.toUpperCase())}
                                placeholder="Currency"
                                className="input md:w-32"
                                disabled={newCourseAccessType === 'FREE'}
                              />
                            </div>
                            <button className="btn" onClick={handleCreateCourse}>
                              Add Course
                            </button>
                          </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary">Courses</h3>
                  <div className="mt-3 space-y-3">
                    <button className="btn btn-secondary" onClick={fetchCourses} disabled={loadingCourses}>
                      {loadingCourses ? 'Refreshing...' : 'Refresh'}
                    </button>
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between rounded-lg border border-default px-4 py-3"
                      >
                        <div>
                          <div className="font-medium text-primary">{course.title}</div>
                          <div className="text-xs text-secondary">{course.status}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn btn-secondary" onClick={() => setSelectedCourseId(course.id)}>
                            Manage
                          </button>
                          <button className="btn btn-outline" onClick={() => handleDeleteCourse(course.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {!loadingCourses && courses.length === 0 ? (
                      <div className="text-sm text-secondary">No courses found.</div>
                    ) : null}
                  </div>
                </div>

                {selectedCourse ? (
                  <div className="border-t border-default pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">
                        Manage Course: {selectedCourse.title}
                      </h3>
                      <button className="btn btn-secondary" onClick={() => fetchCourseDetail(selectedCourse.id)}>
                        Refresh
                      </button>
                    </div>
                    {loadingCourseDetail ? (
                      <p className="text-secondary mt-4">Loading course details...</p>
                    ) : (
                      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-primary">Course Settings</h4>
                          <div className="flex flex-col gap-3">
                            <select
                              value={courseAccessType}
                              onChange={(e) => setCourseAccessType(e.target.value as 'FREE' | 'PAID' | 'SUBSCRIPTION')}
                              className="input"
                            >
                              <option value="FREE">Free</option>
                              <option value="PAID">Paid (one-time)</option>
                              <option value="SUBSCRIPTION">Subscription</option>
                            </select>
                            <input
                              type="number"
                              min={0}
                              value={coursePriceCents}
                              onChange={(e) => setCoursePriceCents(e.target.value ? Number(e.target.value) : '')}
                              placeholder="Price in cents"
                              className="input"
                              disabled={courseAccessType === 'FREE'}
                            />
                            <input
                              value={courseCurrency}
                              onChange={(e) => setCourseCurrency(e.target.value.toUpperCase())}
                              placeholder="Currency (USD)"
                              className="input"
                              disabled={courseAccessType === 'FREE'}
                            />
                            <button className="btn" onClick={handleUpdateCourseAccess}>
                              Save Settings
                            </button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-primary">Create Module</h4>
                          <div className="flex flex-col gap-3">
                            <input
                              value={moduleTitle}
                              onChange={(e) => setModuleTitle(e.target.value)}
                              placeholder="Module title"
                              className="input"
                            />
                            <input
                              type="number"
                              min={1}
                              value={modulePosition}
                              onChange={(e) => setModulePosition(Number(e.target.value))}
                              className="input"
                            />
                            <button className="btn" onClick={handleCreateModule}>
                              Add Module
                            </button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-primary">Create Lesson</h4>
                          <div className="flex flex-col gap-3">
                            <select
                              value={lessonModuleId}
                              onChange={(e) => setLessonModuleId(e.target.value)}
                              className="input"
                            >
                              <option value="">Select module</option>
                              {selectedCourse.modules.map((mod) => (
                                <option key={mod.id} value={mod.id}>
                                  {mod.title}
                                </option>
                              ))}
                            </select>
                            <input
                              value={lessonTitle}
                              onChange={(e) => setLessonTitle(e.target.value)}
                              placeholder="Lesson title"
                              className="input"
                            />
                            <select
                              value={lessonType}
                              onChange={(e) =>
                                setLessonType(e.target.value as 'VIDEO' | 'TEXT' | 'PDF' | 'QUIZ' | 'ASSIGNMENT')
                              }
                              className="input"
                            >
                              <option value="VIDEO">Video</option>
                              <option value="TEXT">Text</option>
                              <option value="PDF">PDF</option>
                              <option value="QUIZ">Quiz</option>
                              <option value="ASSIGNMENT">Assignment</option>
                            </select>
                            <input
                              type="number"
                              min={1}
                              value={lessonPosition}
                              onChange={(e) => setLessonPosition(Number(e.target.value))}
                              className="input"
                            />
                            {lessonType === 'VIDEO' ? (
                              <input
                                value={lessonVideoUrl}
                                onChange={(e) => setLessonVideoUrl(e.target.value)}
                                placeholder="YouTube URL"
                                className="input"
                              />
                            ) : null}
                            {lessonType === 'PDF' ? (
                              <input
                                value={lessonPdfUrl}
                                onChange={(e) => setLessonPdfUrl(e.target.value)}
                                placeholder="PDF URL"
                                className="input"
                              />
                            ) : null}
                            {lessonType === 'TEXT' || lessonType === 'QUIZ' || lessonType === 'ASSIGNMENT' ? (
                              <textarea
                                value={lessonContent}
                                onChange={(e) => setLessonContent(e.target.value)}
                                placeholder="Lesson content or instructions"
                                className="input"
                                rows={4}
                              />
                            ) : null}
                            <input
                              type="datetime-local"
                              value={lessonReleaseAt}
                              onChange={(e) => setLessonReleaseAt(e.target.value)}
                              className="input"
                            />
                            <button className="btn" onClick={handleCreateLesson}>
                              Add Lesson
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 space-y-4">
                      <h4 className="text-base font-semibold text-primary">Modules & Lessons</h4>
                      {selectedCourse.modules.length === 0 ? (
                        <p className="text-sm text-secondary">No modules added yet.</p>
                      ) : (
                        selectedCourse.modules.map((mod) => (
                          <div key={mod.id} className="rounded-lg border border-default p-4">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-primary">
                                {mod.position}. {mod.title}
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="btn btn-secondary" onClick={() => handleEditModule(mod)}>
                                  Edit
                                </button>
                                <button className="btn btn-outline" onClick={() => handleDeleteModule(mod.id)}>
                                  Delete
                                </button>
                              </div>
                            </div>
                            {editModuleId === mod.id ? (
                              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                                <input
                                  value={editModuleTitle}
                                  onChange={(e) => setEditModuleTitle(e.target.value)}
                                  className="input"
                                />
                                <input
                                  type="number"
                                  min={1}
                                  value={editModulePosition}
                                  onChange={(e) => setEditModulePosition(Number(e.target.value))}
                                  className="input"
                                />
                                <div className="flex gap-2">
                                  <button className="btn" onClick={handleUpdateModule}>
                                    Save
                                  </button>
                                  <button className="btn btn-secondary" onClick={() => setEditModuleId(null)}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : null}
                            <div className="mt-3 space-y-2">
                              {mod.lessons.length === 0 ? (
                                <p className="text-sm text-secondary">No lessons yet.</p>
                              ) : (
                                mod.lessons.map((lesson) => (
                                  <div key={lesson.id} className="rounded-lg border border-default p-3">
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm text-secondary">
                                        {lesson.position}. {lesson.title} ({lesson.type})
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button className="btn btn-secondary" onClick={() => handleEditLesson(lesson)}>
                                          Edit
                                        </button>
                                        <button className="btn btn-outline" onClick={() => handleDeleteLesson(lesson.id)}>
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                    {editLessonId === lesson.id ? (
                                      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <input
                                          value={editLessonTitle}
                                          onChange={(e) => setEditLessonTitle(e.target.value)}
                                          className="input"
                                        />
                                        <select
                                          value={editLessonType}
                                          onChange={(e) =>
                                            setEditLessonType(
                                              e.target.value as 'VIDEO' | 'TEXT' | 'PDF' | 'QUIZ' | 'ASSIGNMENT'
                                            )
                                          }
                                          className="input"
                                        >
                                          <option value="VIDEO">Video</option>
                                          <option value="TEXT">Text</option>
                                          <option value="PDF">PDF</option>
                                          <option value="QUIZ">Quiz</option>
                                          <option value="ASSIGNMENT">Assignment</option>
                                        </select>
                                        <input
                                          type="number"
                                          min={1}
                                          value={editLessonPosition}
                                          onChange={(e) => setEditLessonPosition(Number(e.target.value))}
                                          className="input"
                                        />
                                        {editLessonType === 'VIDEO' ? (
                                          <input
                                            value={editLessonVideoUrl}
                                            onChange={(e) => setEditLessonVideoUrl(e.target.value)}
                                            placeholder="YouTube URL"
                                            className="input md:col-span-3"
                                          />
                                        ) : null}
                                        {editLessonType === 'PDF' ? (
                                          <input
                                            value={editLessonPdfUrl}
                                            onChange={(e) => setEditLessonPdfUrl(e.target.value)}
                                            placeholder="PDF URL"
                                            className="input md:col-span-3"
                                          />
                                        ) : null}
                                        {editLessonType === 'TEXT' || editLessonType === 'QUIZ' || editLessonType === 'ASSIGNMENT' ? (
                                          <textarea
                                            value={editLessonContent}
                                            onChange={(e) => setEditLessonContent(e.target.value)}
                                            placeholder="Lesson content or instructions"
                                            className="input md:col-span-3"
                                            rows={3}
                                          />
                                        ) : null}
                                        <input
                                          type="datetime-local"
                                          value={editLessonReleaseAt}
                                          onChange={(e) => setEditLessonReleaseAt(e.target.value)}
                                          className="input md:col-span-2"
                                        />
                                        <div className="flex gap-2 md:col-span-1">
                                          <button className="btn" onClick={handleUpdateLesson}>
                                            Save
                                          </button>
                                          <button className="btn btn-secondary" onClick={() => setEditLessonId(null)}>
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                <div className="mt-8 space-y-4">
                  <h4 className="text-base font-semibold text-primary">Enroll Student</h4>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <select
                          value={selectedStudentId}
                          onChange={(e) => setSelectedStudentId(e.target.value)}
                          className="input flex-1"
                        >
                          <option value="">Select student</option>
                          {students.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.name} ({student.email})
                            </option>
                          ))}
                        </select>
                        <button className="btn" onClick={handleEnrollStudent}>
                          Enroll Student
                        </button>
                      </div>
                      <div className="space-y-2">
                        {courseEnrollments.length === 0 ? (
                          <div className="text-sm text-secondary">No enrollments for this course.</div>
                        ) : (
                          courseEnrollments.map((enrollment) => (
                            <div
                              key={enrollment.id}
                              className="rounded border border-default px-3 py-2 text-sm text-secondary"
                            >
                              {enrollment.user.name} ({enrollment.user.email})
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h4 className="text-base font-semibold text-primary">Instructors</h4>
                      <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <select
                          value={selectedInstructorId}
                          onChange={(e) => setSelectedInstructorId(e.target.value)}
                          className="input flex-1"
                        >
                          <option value="">Select instructor</option>
                          {instructors.map((ins) => (
                            <option key={ins.id} value={ins.id}>
                              {ins.name} ({ins.email})
                            </option>
                          ))}
                        </select>
                        <button className="btn" onClick={handleAssignInstructor}>
                          Assign Instructor
                        </button>
                      </div>
                      <div className="space-y-2">
                        {selectedCourse?.instructors && selectedCourse.instructors.length > 0 ? (
                          selectedCourse.instructors.map((ins) => (
                            <div key={ins.id} className="flex items-center justify-between rounded border border-default px-3 py-2 text-sm">
                              <div className="text-secondary">
                                {ins.name} ({ins.email})
                              </div>
                              <button className="btn btn-outline" onClick={() => handleRemoveInstructor(ins.id)}>
                                Remove
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-secondary">No instructors assigned yet.</div>
                        )}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-base font-semibold text-primary">Issue Certificate</h4>
                  {certificateError ? (
                    <div className="text-sm text-red-500">{certificateError}</div>
                  ) : null}
                  {certificateSuccess ? (
                    <div className="text-sm text-green-500">{certificateSuccess}</div>
                  ) : null}
                  <div className="flex gap-3">
                    <button className="btn" onClick={handleIssueCertificate}>
                      Issue Certificate for Selected Student
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
              </div>
            ) : role === 'INSTRUCTOR' && activeTab === 'courses' ? (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <label className="text-sm text-secondary">Instructor</label>
                  <select
                    value={selectedInstructorId}
                    onChange={(e) => setSelectedInstructorId(e.target.value)}
                    className="input flex-1"
                  >
                    <option value="">Select instructor</option>
                    {instructors.map((ins) => (
                      <option key={ins.id} value={ins.id}>
                        {ins.name} ({ins.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  {courses
                    .filter((course) =>
                      selectedInstructorId
                        ? course.instructors?.some((ins) => ins.id === selectedInstructorId)
                        : true
                    )
                    .map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between rounded-lg border border-default px-4 py-3"
                      >
                        <div>
                          <div className="font-medium text-primary">{course.title}</div>
                          <div className="text-xs text-secondary">{course.status}</div>
                        </div>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setInstructorCourseId(course.id);
                            fetchInstructorEnrollments(course.id);
                          }}
                        >
                          View Students
                        </button>
                      </div>
                    ))}
                </div>
                {instructorCourseId ? (
                  <div className="rounded-lg border border-default p-4">
                    <div className="font-medium text-primary">Enrolled Students</div>
                    <div className="mt-3 space-y-2">
                      {instructorEnrollments.length === 0 ? (
                        <div className="text-sm text-secondary">No students enrolled.</div>
                      ) : (
                        instructorEnrollments.map((enroll) => (
                          <div key={enroll.id} className="text-sm text-secondary">
                            {enroll.user.name} ({enroll.user.email})
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : role === 'INSTRUCTOR' && activeTab === 'students' ? (
              <div className="mt-4 space-y-3 text-sm text-secondary">
                <div>Select a course in the Courses tab to view enrolled students.</div>
              </div>
            ) : role === 'INSTRUCTOR' && activeTab === 'content' ? (
              <div className="mt-4 space-y-3 text-sm text-secondary">
                <div>Content review queue and draft approvals will appear here.</div>
              </div>
            ) : role === 'STUDENT' && activeTab === 'courses' ? (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <label className="text-sm text-secondary">Student</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="input flex-1"
                  >
                    <option value="">Select student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                  </select>
                </div>
                {loadingStudentData ? (
                  <div className="text-sm text-secondary">Loading enrollments...</div>
                ) : studentEnrollments.length === 0 ? (
                  <div className="text-sm text-secondary">No enrollments found.</div>
                ) : (
                  studentEnrollments.map((enrollment) => (
                    <div key={enrollment.id} className="rounded border border-default p-3 text-sm text-secondary">
                      {enrollment.course.title} — {enrollment.user.name} ({enrollment.user.email})
                    </div>
                  ))
                )}
              </div>
            ) : role === 'STUDENT' && activeTab === 'progress' ? (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <label className="text-sm text-secondary">Student</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="input flex-1"
                  >
                    <option value="">Select student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                  </select>
                </div>
                {loadingStudentData ? (
                  <div className="text-sm text-secondary">Loading progress...</div>
                ) : studentProgress.length === 0 ? (
                  <div className="text-sm text-secondary">No progress found.</div>
                ) : (
                  studentProgress.map((item) => (
                    <div key={item.id} className="rounded border border-default p-3 text-sm text-secondary">
                      {item.lesson.title} — {Math.round(item.progress * 100)}% {item.completed ? '✓' : ''}
                    </div>
                  ))
                )}
              </div>
            ) : role === 'STUDENT' && activeTab === 'certificates' ? (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <label className="text-sm text-secondary">Student</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="input flex-1"
                  >
                    <option value="">Select student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                  </select>
                </div>
                {loadingStudentData ? (
                  <div className="text-sm text-secondary">Loading certificates...</div>
                ) : studentCertificates.length === 0 ? (
                  <div className="text-sm text-secondary">No certificates yet.</div>
                ) : (
                  studentCertificates.map((cert) => (
                    <div key={cert.id} className="rounded border border-default p-3 text-sm text-secondary">
                      {cert.course.title} — {new Date(cert.issuedAt).toLocaleDateString()}
                    </div>
                  ))
                )}
              </div>
            ) : role === 'ADMIN' && activeTab === 'payments' ? (
              <div className="mt-4 space-y-5">
                <div className="flex flex-col gap-3 md:flex-row">
                  <select
                    value={paymentUserId}
                    onChange={(e) => setPaymentUserId(e.target.value)}
                    className="input flex-1"
                  >
                    <option value="">Select student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={0}
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    placeholder="Amount in cents"
                    className="input md:w-48"
                  />
                  <select
                    value={manualProvider}
                    onChange={(e) => setManualProvider(e.target.value as 'STRIPE' | 'LOCAL')}
                    className="input md:w-48"
                  >
                    <option value="LOCAL">Manual</option>
                    <option value="STRIPE">Stripe Intent</option>
                  </select>
                  <input
                    value={manualCurrency}
                    onChange={(e) => setManualCurrency(e.target.value.toUpperCase())}
                    placeholder="Currency"
                    className="input md:w-32"
                  />
                  <button className="btn" onClick={manualProvider === 'LOCAL' ? handleManualPayment : handleStripeIntent}>
                    {manualProvider === 'LOCAL' ? 'Record Payment' : loadingStripe ? 'Creating intent…' : 'Stripe Intent'}
                  </button>
                </div>
                {stripeClientSecret ? (
                  <div className="text-sm text-secondary">
                    Stripe client secret: <span className="font-mono">{stripeClientSecret}</span>
                  </div>
                ) : null}
                {paymentListError ? (
                  <div className="text-sm text-red-500">{paymentListError}</div>
                ) : null}
                {paymentSuccess ? (
                  <div className="text-sm text-green-500">{paymentSuccess}</div>
                ) : null}
                <div className="rounded-lg border border-default p-4">
                  <div className="text-sm font-semibold text-primary">Payments</div>
                  {loadingPayments ? (
                    <div className="text-sm text-secondary mt-3">Loading payments…</div>
                  ) : payments.length === 0 ? (
                    <div className="text-sm text-secondary mt-3">No payments recorded.</div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {payments.map((payment) => (
                        <div key={payment.id} className="flex flex-col gap-1 rounded border border-muted p-3">
                          <div className="text-sm text-primary">
                            {payment.user.name} — {payment.amountCents / 100} {payment.currency}
                          </div>
                          <div className="text-xs text-secondary">
                            Provider: {payment.provider} | Course: {payment.course?.title ?? 'N/A'} | Ref:{' '}
                            {payment.providerRef ?? '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : role === 'STUDENT' && activeTab === 'payments' ? (
              <div className="mt-4 space-y-4">
                {loadingPayments ? (
                  <div className="text-sm text-secondary">Loading payments...</div>
                ) : payments.length === 0 ? (
                  <div className="text-sm text-secondary">No payments recorded yet.</div>
                ) : (
                  payments.map((payment) => (
                    <div key={payment.id} className="rounded border border-default p-3 text-sm text-secondary">
                      Amount: {payment.amountCents / 100} {payment.currency} — Provider: {payment.provider}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-secondary mt-3 text-sm">
                This section will be wired to real data. Next, we will connect APIs for courses,
                enrollments, and progress based on the selected role.
              </p>
            )}
          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
