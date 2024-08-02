import React, { useEffect, useState } from 'react'
import './Project.css'
import SideBar from '../../components/SideBar/SideBar'
import GetListProjectResponse from '../../models/responses/project/getListProjectResponse';
import { Paginate } from '../../models/paginate';
import projectService from '../../services/projectService';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextInput from '../../utilities/customFormControls/textInput';
import AddProjectRequest from '../../models/requests/project/addProjectRequest';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UpdateProjectRequest from '../../models/requests/project/updateProjectRequest';
import GetProjectResponse from '../../models/responses/project/getProjectResponse';

export default function Project() {

    const [projects, setProjects] = useState<Paginate<GetListProjectResponse>>();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");
    const [selectedProject, setSelectedProject] = useState<GetProjectResponse>();

    const navigate = useNavigate();

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);
    
    const handleUpdateModalClose = () => setShowUpdateModal(false);
    const handleUpdateModalShow = () => setShowUpdateModal(true);

    const handleAddProject = async (values: any) => {
        const addRequest: AddProjectRequest = {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate
        };

        const response = await projectService.add(addRequest);
        if (response.data) {
            toast.success("Proje başarıyla eklendi.");
            handleAddModalClose();
            getProjects();
        }
    }

    const handleUpdateProject = async (values: any) => {
        const updateProject: UpdateProjectRequest = {
            id: selectedProjectId,
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate
        }
        const response = await projectService.update(updateProject);

        if (response.data) {
            toast.success("Proje Güncellendi.");
            handleUpdateModalClose();
            getProjects();
        }
    }
    const handleDeleteProject = async (selectedProjectId: any) => {
        await projectService.delete(selectedProjectId);
        getProjects();
    }
    const handleOpenUpdateModal = (projectId: string) => {
        setShowUpdateModal(true);
        setSelectedProjectId(projectId);
        projectService.getById(projectId).then((response) => {
            setSelectedProject(response.data);
        })
    }

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('tr-TR', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formatDateForInitialValue = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Ayı 2 haneli yapmak için
        const day = (`0${date.getDate()}`).slice(-2); // Günü 2 haneli yapmak için
        return `${year}-${month}-${day}`;
    };

    const [initialValues, setInitialValues] = useState({
        name: "",
        startDate: formatDateForInitialValue(new Date().toISOString()),
        endDate: formatDateForInitialValue(new Date().toISOString()),
    });

    useEffect(() => {
        if (selectedProject && selectedProject.startDate) {
            setInitialValues({
                name: selectedProject.name,
                startDate: formatDateForInitialValue(String(selectedProject.startDate)),
                endDate: formatDateForInitialValue(String(selectedProject.endDate)),
            });
        }
    }, [selectedProject]);

    useEffect(() => {
        getProjects();
    }, [])

    const getProjects = () => {
        projectService.getAll(0, 10).then((result) => {
            setProjects(result.data);
        })
    }

    return (
        <div className='project-page'>
            <div className="row">
                <div className="col-md-2">
                    <SideBar />
                </div>

                <div className="col-md-8 mt-5 container">
                    <div className="project-page-info">
                        <h5>
                            Proje Bilgilerim
                        </h5>
                        <p onClick={handleAddModalShow}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
    <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
</svg>
                            Yeni Proje Ekle
                        </p>
                    </div>

                    <Modal show={showAddModal} onHide={handleAddModalClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Proje Ekleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    handleAddProject(values)
                                }}
                            >
                                <Form className="assignment-page-form">
                                    <Row>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Proje Adı</span>
                                            <TextInput
                                                type="string"
                                                name="name"
                                            />
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Oluşturulma Tarihi</span>
                                            <TextInput
                                                type="date"
                                                name="startDate"
                                                className="project-select"
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12} className='mb-5'>
                                            <span>Bitiş Tarihi</span>
                                            <TextInput
                                                type="date"
                                                name="endDate"
                                                className="project-select"
                                            />
                                        </Col>
                                    </Row>
                                    <Button className="mb-2" type="submit">
                                        Proje Oluştur
                                    </Button>
                                </Form>
                            </Formik>
                        </Modal.Body>
                    </Modal>

                    <table className="ui celled table mt-3">
                        <thead>
                            <tr>
                                <th>Proje Adı</th>
                                <th> Proje Oluşturulma Tarihi</th>
                                <th>Proje Bitiş Tarihi</th>
                                <th>Güncelle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects?.items.map((project: GetListProjectResponse) => (
                                <tr id='project-detail-button' >
                                    <td onClick={() => navigate("/proje-detay/" + project.id)} data-label="name" >{project.name}</td>
                                    <td onClick={() => navigate("/proje-detay/" + project.id)} data-label="startDate">{String(formatDate(project.startDate))}</td>
                                    <td onClick={() => navigate("/proje-detay/" + project.id)} data-label="endDate">{String(formatDate(project.endDate))}</td>
                                    <td><Button onClick={() => handleOpenUpdateModal(String(project.id))}>Güncelle</Button></td>
                                    <td><Button onClick={() => handleDeleteProject(String(project.id))}>Sil</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Modal show={showUpdateModal} onHide={handleUpdateModalClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Proje Güncelleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    handleUpdateProject(values)
                                }}
                            >
                                <Form className="assignment-page-form">
                                    <Row>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Proje Adı</span>
                                            <TextInput
                                                type="string"
                                                name="name"
                                            />
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Oluşturulma Tarihi</span>
                                            <TextInput
                                                type="date"
                                                name="startDate"
                                                className="project-select"
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12} className='mb-5'>
                                            <span>Bitiş Tarihi</span>
                                            <TextInput
                                                type="date"
                                                name="endDate"
                                                className="project-select"
                                            />
                                        </Col>
                                    </Row>
                                    <Button className="mb-2" type="submit">
                                        Proje Güncelle
                                    </Button>
                                </Form>
                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
