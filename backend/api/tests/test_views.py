from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from api.models import Question_Answer, Question_Answer_Message, Course, Teacher, Category, EnrolledCourse, CartOrderItem, User, Review
from userauths.models import Profile
from decimal import Decimal
from datetime import datetime, timedelta


class QuestionAnswerViewsTestCase(APITestCase):

    def setUp(self):
        # Create user, teacher, category, and course for testing
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="testpass"
        )
        self.teacher = Teacher.objects.create(
            user=self.user, full_name="Test Teacher"
        )
        self.category = Category.objects.create(
            title="Test Category"
        )
        self.course = Course.objects.create(
            category=self.category,
            teacher=self.teacher,
            title="Test Course",
            description="This is a test course",
            price=Decimal('100.00')
        )

    def test_create_question_answer(self):
        """Test creating a question and answer for a course."""
        url = reverse('question-answer-list-create', kwargs={'course_id': self.course.id})
        data = {
            "course_id": self.course.id,
            "user_id": self.user.id,
            "title": "Question Title",
            "message": "This is a test message"
        }
        self.client.login(username="testuser", password="testpass")
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Question_Answer.objects.count(), 1)
        self.assertEqual(Question_Answer_Message.objects.count(), 1)

    def test_send_question_answer_message(self):
        """Test sending a message to a question and answer."""
        question = Question_Answer.objects.create(
            course=self.course,
            user=self.user,
            title="Test Question"
        )
        url = reverse('question-answer-message-create')
        data = {
            "course_id": self.course.id,
            "qa_id": question.qa_id,
            "user_id": self.user.id,
            "message": "This is a follow-up message"
        }
        self.client.login(username="testuser", password="testpass")
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Question_Answer_Message.objects.count(), 1)


class TeacherSummaryViewsTestCase(APITestCase):

    def setUp(self):
        # Create user, teacher, category, and course for testing
        self.user = User.objects.create_user(
            username="teacheruser", email="teacheruser@example.com", password="teacherpass"
        )
        self.teacher = Teacher.objects.create(
            user=self.user, full_name="Teacher User"
        )
        self.category = Category.objects.create(
            title="Test Category"
        )
        self.course = Course.objects.create(
            category=self.category,
            teacher=self.teacher,
            title="Test Course",
            description="This is a test course",
            price=Decimal('100.00')
        )

        # Enroll students in the course
        for i in range(3):
            student = User.objects.create_user(
                username=f"student{i}", email=f"student{i}@example.com", password="studentpass"
            )
            EnrolledCourse.objects.create(
                course=self.course,
                user=student,
                teacher=self.teacher,
                order_item=CartOrderItem.objects.create(
                    order=None,
                    course=self.course,
                    teacher=self.teacher,
                    price=Decimal('100.00'),
                    total=Decimal('100.00'),
                    tax_fee=Decimal('10.00'),
                    initial_total=Decimal('110.00')
                )
            )

    def test_teacher_summary(self):
        """Test teacher summary API including total revenue and students."""
        url = reverse('teacher-summary', kwargs={'teacher_id': self.teacher.id})
        self.client.login(username="teacheruser", password="teacherpass")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['total_courses'], 1)
        self.assertEqual(response.data[0]['total_students'], 3)


class StudentCourseProgressViewsTestCase(APITestCase):

    def setUp(self):
        # Create user, teacher, category, and course for testing
        self.student = User.objects.create_user(
            username="teststudent", email="teststudent@example.com", password="studentpass"
        )
        self.teacher = Teacher.objects.create(
            user=self.student, full_name="Teacher User"
        )
        self.category = Category.objects.create(
            title="Test Category"
        )
        self.course = Course.objects.create(
            category=self.category,
            teacher=self.teacher,
            title="Test Course",
            description="This is a test course",
            price=Decimal('100.00')
        )

        self.enrolled_course = EnrolledCourse.objects.create(
            course=self.course,
            user=self.student,
            teacher=self.teacher,
            order_item=CartOrderItem.objects.create(
                order=None,
                course=self.course,
                teacher=self.teacher,
                price=Decimal('100.00'),
                total=Decimal('100.00'),
                tax_fee=Decimal('10.00'),
                initial_total=Decimal('110.00')
            )
        )

    def test_student_course_progress(self):
        """Test retrieving the student's progress for a course."""
        url = reverse('student-course-progress', kwargs={'user_id': self.student.id})
        self.client.login(username="teststudent", password="studentpass")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['course_progress']), 1)
        self.assertEqual(response.data['course_progress'][0]['course_title'], 'Test Course')
