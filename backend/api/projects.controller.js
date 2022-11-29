import ProjectsDAO from "../dao/projectsDAO.js"

export default class ProjectsController {

    static async apiPostProject(req, res, next) {
        try {
                  const projectname = req.body.projectname
                  const password = req.body.password
                  const email = req.body.email

            console.log(projectname)
            console.log(password)
            console.log(email)


            const date = new Date()

            const ProjectResponse = await ProjectsDAO.addProject(
                        projectname,
                        password,
                        email,
                        date,
            )
            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiUpdateProject(req, res, next) {
        try {
            const projectId = req.body._id
            const projectname = req.body.projectname
            const date = new Date()
            const password = req.body.password
            const email = req.body.email
            const projectResponse = await ProjectsDAO.updateProject(
                projectId,
                projectname,
                password,
                email,
                date,

            )

            var { error  } = projectResponse
            if (error) {
                        res.status(400).json({ error  })

            }

            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiDeleteProject(req, res, next) {
        try {
                  const projectId = req.query._id
                  const password = req.body.password
                  console.log(projectId)
            const projectResponse = await ProjectsDAO.deleteProject(
                        projectId,
                        password,

            )
                  res.json({ status: "success"  })

        } catch (e) {
                  res.status(500).json({ error: e.message  })

        }

    }

    static async apiGetProjects(req, res, next){
        console.log("never gonna give you up")
    }
/*
    static async apiGetProjects(req, res, next) {
            const projectsPerPage = req.query.projectsPerPage ? parseInt(req.query.projectsPerPage, 10) : 20
            const page = req.query.page ? parseInt(req.query.page, 10) : 0

            let filters = {}
        if (req.query.cuisine) {
                  filters.cuisine = req.query.cuisine

        } else if (req.query.zipcode) {
                  filters.zipcode = req.query.zipcode

        } else if (req.query.name) {
                  filters.name = req.query.name

        }

        const { projectsList, totalNumProjects} = await ProjectsDAO.getProjects({
                  filters,
                  page,
                  projectsPerPage,

        })

        let response = {
                  projects: projectsList,
                  page: page,
                  filters: filters,
                  entries_per_page: projectsPerPage,
                  total_results: totalNumProjects,

        }
            res.json(response)

    }
    static async apiGetProjectById(req, res, next) {
        try {
                  let id = req.params.id || {}
                  let project = await ProjectsDAO.getProjectByID(id)
            if (!project) {
                        res.status(404).json({ error: "Not found"  })
                        return

            }
                  res.json(project)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }

    static async apiGetProjectCuisines(req, res, next) {
        try {
                  let cuisines = await ProjectsDAO.getCuisines()
                  res.json(cuisines)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }
*/
}
