import React, { useState, useEffect } from "react";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserData from "../plugin/UserData";

function QuizCreate() {
  const [courses, setCourses] = useState([]);

  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    courseName: "",
    title: "",
    description: "",
    course: "", // Course ID the quiz is associated with
    questions: [
      {
        question_text: "",
        answers: [{ answer_text: "", is_correct: false }],
      },
    ],
  });

  useEffect(() => {
    // Fetch the list of courses for the instructor
    axiosInstance
      .get(`/teacher/course-lists/${UserData()?.teacher_id}/`)
      .then((res) => {
        setCourses(res.data);
      });
  }, []);

  const handleQuizInputChange = (event) => {
    setQuiz({
      ...quiz,
      [event.target.name]: event.target.value,
    });
  };

  const handleCourseChange = (event) => {
    console.log("course", event.target.value);
    const selectedCourseId = event.target.value;
    const selectedCourseName = courses.find(
      (course) => course.id === selectedCourseId
    );
    setQuiz({
      ...quiz,
      courseName: selectedCourseName?.title,
      course: event.target.value,
    });
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].answers[answerIndex][event.target.name] =
      event.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question_text: "",
          answers: [{ answer_text: "", is_correct: false }],
        },
      ],
    });
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].answers.push({
      answer_text: "",
      is_correct: false,
    });
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].answers.forEach((answer, index) => {
      newQuestions[questionIndex].answers[index].is_correct =
        index === answerIndex;
    });
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/teacher/create-quiz/`, {
        ...quiz,
        is_draft: isDraft,
      });
      Swal.fire({
        icon: "success",
        title: `Quiz ${isDraft ? "Saved" : "Created"} Successfully`,
      });
      navigate("/instructor/quizzes/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to save quiz",
        text: error.response?.data?.detail || "Something went wrong",
      });
    }
  };

  return (
    <>
      <BaseHeader />
      <section className="pt-5 pb-5">
        <div className="container">
          <Header />
          <div className="row mt-0 mt-md-4">
            <Sidebar />
            <form
              className="col-lg-9 col-md-8 col-12"
              onSubmit={(e) => handleSubmit(e, false)}
            >
              <h1 className="text-center mb-4">Create Quiz</h1>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <select
                  className="form-select"
                  value={quiz.course}
                  onChange={handleCourseChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Quiz Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={quiz.title}
                  onChange={handleQuizInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={quiz.description}
                  onChange={handleQuizInputChange}
                />
              </div>
              {/* Render the list of questions */}
              {quiz.questions.map((question, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">Question {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="question_text"
                    value={question.question_text}
                    onChange={(e) => handleQuestionChange(index, e)}
                    required
                  />
                  <div className="mt-2">
                    {/* Render the list of answers for this question */}
                    {question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className="mt-2">
                        <label className="form-label">
                          Answer {answerIndex + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="answer_text"
                          value={answer.answer_text}
                          onChange={(e) =>
                            handleAnswerChange(index, answerIndex, e)
                          }
                          required
                        />
                        <div className="form-check mt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={answer.is_correct}
                            onChange={() =>
                              handleCorrectAnswerChange(index, answerIndex)
                            }
                          />
                          <label className="form-check-label">
                            Mark as correct
                          </label>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm mt-2"
                      onClick={() => handleAddAnswer(index)}
                    >
                      + Add Answer
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleAddQuestion}
              >
                + Add Question
              </button>
              <div className="mt-4">
                <button type="submit" className="btn btn-success me-3">
                  Create Quiz
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => handleSubmit(e, true)}
                >
                  Save Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
}

export default QuizCreate;
