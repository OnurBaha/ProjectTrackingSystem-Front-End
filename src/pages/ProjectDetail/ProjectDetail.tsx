import React, { useEffect, useState } from 'react'
import SideProfileMenu from '../../components/SideBar/SideBar'
import assignmentService from '../../services/assignmentService';
import GetListAssignmentResponse from '../../models/responses/assignment/getListAssignmentResponse';
import { Paginate } from '../../models/paginate';
import { useParams } from 'react-router-dom';
import projectService from '../../services/projectService';
import GetListProjectResponse from '../../models/responses/project/getListProjectResponse';

export default function ProjectDetail() {
    const [assignments, setAssignments] = useState<Paginate<GetListAssignmentResponse>>();
    let { projectId } = useParams();
    const [project, setProject] = useState<GetListProjectResponse>();
    
    useEffect(() => {
        getAssignment();
        getProject();
    }, [projectId])



    const getAssignment = () => {
        assignmentService.getByProjectId(projectId!,0, 10).then(result => {
            setAssignments(result.data);
            console.log(result.data);
        })
    }


    const getProject = () => {
        projectService.getById(projectId!).then(result=>{
            setProject(result.data);
        })
    }

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('tr-TR', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
    return (
        <div className='project-detail '>

            <div className="row">

                <div className="col-md-3 ">
                    <SideProfileMenu />
                </div>
                
                <div className="col-md-8 mt-5 container">
                <div className="project-page-info" >
                        <h5>
                        {project?.name}
                        </h5>
                        
                    </div>
                <table className="ui celled table mt-3">
                        <thead>
                            <tr>
                                <th>Görev Adı</th>
                                <th> Görev Tanımı</th>
                                <th>Görev Durumu</th>
                                <th>Görev Oluşturma Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments?.items.map(function (assignment: GetListAssignmentResponse) {
                                return (
                                    <tr>
                                        <td data-label="title">{assignment.title}</td>
                                        <td data-label="description">{assignment.description}</td>
                                        <td data-label="status">{assignment.status}</td>
                                        <td data-label="creationDate">{String(formatDate(assignment.creationDate))}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
