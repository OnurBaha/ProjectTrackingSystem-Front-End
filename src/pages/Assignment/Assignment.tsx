import React, { useEffect, useState } from 'react'
import "./Assignment.css"
import { Button, Col, Modal, Pagination, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextInput from '../../utilities/customFormControls/textInput';
import authService from '../../services/authService';
import assignmentService from '../../services/assignmentService';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { Paginate } from '../../models/paginate';
import GetListAssignmentResponse from '../../models/responses/assignment/getListAssignmentResponse';
import AddAssignmentRequest from '../../models/requests/assignment/addAssignmentRequest';
import SideBar from '../../components/SideBar/SideBar';
import SelectInput from '../../utilities/customFormControls/selectInput';
import projectService from '../../services/projectService';
import GetListProjectResponse from '../../models/responses/project/getListProjectResponse';
import TextArea from '../../utilities/customFormControls/textArea';
import UpdatedAssignmentResponse from '../../models/responses/assignment/updatedAssignmentResponse';
import UpdateAssignmentRequest from '../../models/requests/assignment/updateAssignmentRequest';
import GetAssignmentResponse from '../../models/responses/assignment/getAssignmentResponse';

export default function Assignment() {

    const [assignments, setAssignments] = useState<Paginate<GetListAssignmentResponse>>();
    const [projects, setProjects] = useState<Paginate<GetListProjectResponse>>();
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>("");
    const [selectedAssignment, setSelectedAssignment] = useState<GetAssignmentResponse>();
    const [initialValues, setInitialValues] = useState({
        projectId: "",
        title: "",
        description: "",
        status: "",
    });

    const [show, setShow] = useState(false);
    const user = authService.getUserInfo();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getProjects();
    }
    const userId = user?.id;

    const [pageIndexState, setPageIndexState] = useState<any>(0)

    useEffect(() => {
        getAssignment();
    }, [])

    useEffect(() => {
        getAssignment();
    }, [pageIndexState, userId])


    const getAssignment = () => {
        assignmentService.getAll(0, 10).then(result => {
            setAssignments(result.data);
        })
    }

    const getProjects = () => {
        projectService.getAll(0, 10).then((result) => {
            setProjects(result.data);
        })
    }



    useEffect(() => {
        if (selectedAssignment) {
            setInitialValues({
                projectId: selectedAssignment.projectId,
                title: selectedAssignment.title,
                description: selectedAssignment.description,
                status: selectedAssignment.status,
            });
        }
    }, [selectedAssignment]);

    const handleAddAssignment = async (values: any) => {
        console.log("assignment");
        console.log(values);

        const addAssignment: AddAssignmentRequest = {
            projectId: values.projectId,
            title: values.title,
            description: values.description,
            creationDate: new Date(),
            status: values.status
        }
        const response = await assignmentService.add(addAssignment);

        if (response.data) {
            toast.success("Görev Eklendi.");
            handleClose();
            getAssignment();
        }
    }

    const handleUpdateAssignment = async (values: any) => {

        console.log("assignment");
        console.log(values);

        const updateAssignment: UpdateAssignmentRequest = {
            id: selectedAssignmentId,
            projectId: values.projectId,
            title: values.title,
            description: values.description,
            creationDate: new Date(),
            status: values.status
        }
        const response = await assignmentService.update(updateAssignment);

        if (response.data) {
            toast.success("Görev Güncellendi.");
            handleClose();
            getAssignment();
        }
    }
    const handleDeleteAssignment = async (selectedAssignmentId: any) => {
        await assignmentService.delete(selectedAssignmentId);
        getAssignment();
    }
    const handleOpenUpdateModal = (assignmentId: string) => {
        setShow(true);
        setSelectedAssignmentId(assignmentId);
        getProjects();
        assignmentService.getById(assignmentId).then((response) => {
            setSelectedAssignment(response.data);
        })
    }

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('tr-TR', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }


    function changePageIndex(pageIndex: any) {
        setPageIndexState(pageIndex);
    }

    const pages = [];

    if (assignments?.pages)
        for (let pageIndex = 0; pageIndex < assignments?.pages; pageIndex++) {
            pages.push(
                <Pagination.Item onClick={() => changePageIndex(pageIndex)} key={pageIndex} active={pageIndex === pageIndexState}> {pageIndex + 1} </Pagination.Item>
            );
        }

    return (
        <div className='assignment-page '>
            <div className="row">
                <div className="col-md-2">
                    <SideBar />
                </div>

                <div className="col-md-8 mt-5 container">
                    <div className="assignment-page-info" >
                        <h5>
                            Görev Bilgilerim
                        </h5>
                        <p onClick={handleShow} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
    <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
</svg>
                            Yeni Görev Ekle
                        </p>
                    </div>

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Görev Ekleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                onSubmit={(values) => {
                                    console.log(values);
                                    handleAddAssignment(values)

                                }}>

                                <Form className="assignment-page-form" >
                                    <Row >
                                        <Col md={6} className=' mb-5 mt-4'>
                                            <span>Proje Seç</span>
                                            <SelectInput name="projectId" className="assignment-select" component="select">
                                                <option value="project">Proje Seçiniz</option>
                                                {projects && projects.items.map((project, index) => (
                                                    <option key={index} value={String(project.id)}>{project.name}</option>
                                                ))}
                                            </SelectInput>
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4 '>
                                            <span>Görev Başlığı</span>
                                            <TextInput
                                                name="title"
                                                className=" assignment-select"
                                            >

                                            </TextInput>
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Col md={12} className='mb-5'>
                                            <span>Görev Tanımı</span>

                                            <TextArea
                                                name="description"
                                                className=" assignment-select"
                                            >
                                            </TextArea>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col md={12} className='mb-5'>
                                            <span>Görev Durumu</span>
                                            <SelectInput name="status" className="assignment-select" component="select">
                                                <option value="durum">Durum Seçiniz</option>
                                                <option value="Yeni">Yeni</option>
                                                <option value="Devam Ediyor">Devam Ediyor</option>
                                                <option value="Tamamlandı">Tamamlandı</option>


                                            </SelectInput>


                                        </Col>
                                    </Row>

                                    <Button className="mb-2" type="submit">
                                        Kaydet
                                    </Button>
                                </Form>
                            </Formik>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                    <table className="ui celled table mt-3">
                        <thead>
                            <tr>
                                <th>Görev Adı</th>
                                <th> Görev Tanımı</th>
                                <th>Proje Adı</th>
                                <th>Görev Durumu</th>
                                <th>Görev Oluşturma Tarihi</th>
                                <th>Güncelle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments?.items.map((assignment: GetListAssignmentResponse) => (
                                <tr >
                                    <td data-label="title">{assignment.title}</td>
                                    <td data-label="description">{assignment.description}</td>
                                    <td data-label="projectName">{assignment.projectName}</td>
                                    <td data-label="status">{assignment.status}</td>
                                    <td data-label="creationDate">{String(formatDate(assignment.creationDate))}</td>
                                    <td><Button onClick={() => handleOpenUpdateModal(String(assignment.id))}>Güncelle</Button></td>
                                    <td><Button onClick={() => handleDeleteAssignment(String(assignment.id))}>Sil</Button></td>
                                    <Modal show={show} onHide={handleClose} animation={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Görev Güncelleme</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Formik
                                                initialValues={initialValues}
                                                enableReinitialize
                                                onSubmit={(values) => {
                                                    console.log(values);
                                                    handleUpdateAssignment(values)
                                                }}
                                            >
                                                <Form className="assignment-page-form" >
                                                    <Row >
                                                        <Col md={6} className=' mb-5 mt-4'>
                                                            <span>Proje Seç</span>
                                                            <SelectInput name="projectId" className="assignment-select" component="select">
                                                                <option value="project">Proje Seçiniz</option>
                                                                {projects && projects.items.map((project, index) => (
                                                                    <option key={index} value={String(project.id)}>{project.name}</option>
                                                                ))}
                                                            </SelectInput>
                                                        </Col>
                                                        <Col md={6} className='mb-5 mt-4 '>
                                                            <span>Görev Başlığı</span>
                                                            <TextInput
                                                                name="title"
                                                                className="assignment-select"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col md={12} className='mb-5'>
                                                            <span>Görev Tanımı</span>
                                                            <TextArea
                                                                name="description"
                                                                className="assignment-select"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col md={12} className='mb-5'>
                                                            <span>Görev Durumu</span>
                                                            <SelectInput name="status" className="assignment-select" component="select">
                                                                <option value="durum">Durum Seçiniz</option>
                                                                <option value="Yeni">Yeni</option>
                                                                <option value="Devam Ediyor">Devam Ediyor</option>
                                                                <option value="Tamamlandı">Tamamlandı</option>
                                                            </SelectInput>
                                                        </Col>
                                                    </Row>
                                                    <Button className="mb-2" type="submit">
                                                        Güncelle
                                                    </Button>
                                                </Form>
                                            </Formik>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <Col className="pagination-area" md={12}>
                        <Pagination style={{ display: assignments && assignments.pages > 1 ? 'flex' : 'none' }}>
                            <Pagination.Prev className="pagination-prev-next" disabled={pageIndexState === 0} onClick={() => changePageIndex(pageIndexState - 1)} >
                                <span aria-hidden="true"> &lt; </span>
                            </Pagination.Prev>
                            {pages}
                            <Pagination.Next className="pagination-prev-next" disabled={pageIndexState + 1 === assignments?.pages} onClick={() => changePageIndex(pageIndexState + 1)}>
                                <span aria-hidden="true"> &gt; </span>
                            </Pagination.Next>
                        </Pagination>
                    </Col>
                </div>
            </div>
        </div >
    )
}
