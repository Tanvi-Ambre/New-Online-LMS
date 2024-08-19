import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        useAxios().get(`teacher/quizzes/?teacher_id=${UserData()?.teacher_id}`)
            .then((res) => {
                setQuizzes(res.data);
            });
    }, []);

    const handleDelete = (quizId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this quiz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios().delete(`/teacher/quiz-detail/${quizId}/`)
                    .then(() => {
                        setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
                        Swal.fire("Deleted!", "Your quiz has been deleted.", "success");
                    })
                    .catch((error) => {
                        Swal.fire("Error!", "There was an error deleting the quiz.", "error");
                    });
            }
        });
    };

    const handlePublish = (quizId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to publish this quiz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, publish it!",
            cancelButtonText: "No, keep it as draft",
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios().post(`/teacher/publish-quiz/${quizId}/`)
                    .then(() => {
                        Swal.fire("Published!", "Your quiz has been published.", "success")
                            .then(() => navigate("/instructor/courses/"));
                    })
                    .catch((error) => {
                        Swal.fire("Error!", "There was an error publishing the quiz.", "error");
                    });
            }
        });
    };

    return (
        <>
            <BaseHeader />
            <section className="pt-5 pb-5">
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h3 className="mb-0">Quizzes</h3>
                                    <span>Manage your quizzes from here, search, view, edit, or delete quizzes.</span>
                                </div>
                                <div className="table-responsive overflow-y-hidden">
                                    {quizzes.length > 0 ? (
                                        <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Course</th>
                                                    <th>Quiz Title</th>
                                                    <th>Total Questions</th>
                                                    <th>Total Score</th>
                                                    <th>Date Created</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {quizzes.map((quiz, index) => (
                                                    <tr key={index}>
                                                        <td>{quiz.course_name}</td>
                                                        <td>{quiz.title}</td>
                                                        <td>{quiz.questions.length}</td>
                                                        <td>{quiz.questions.reduce((total, q) => total + q.score, 0)}</td>
                                                        <td>{moment(quiz.created_at).format("DD MMM, YYYY")}</td>
                                                        <td>
                                                            <Link to={`/instructor/edit-quiz/${quiz.id}/`} className="btn btn-primary btn-sm mt-3 me-1">
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                            <button className="btn btn-danger btn-sm mt-3 me-1" onClick={() => handleDelete(quiz.id)}>
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                            <Link to={`/instructor/quiz-detail/${quiz.id}/`} className="btn btn-secondary btn-sm mt-3 me-1">
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                            <button className="btn btn-success btn-sm mt-3 me-1" onClick={() => handlePublish(quiz.id)}>
                                                                <i className="fas fa-upload"></i> Publish
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="p-3 text-center">
                                            <div className="alert alert-warning text-center" role="alert">
                                                No quizzes yet
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BaseFooter />
        </>
    );
}

export default Quizzes;
