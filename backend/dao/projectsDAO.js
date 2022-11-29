import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let projects

export default class ProjectsDAO {
    static async injectDB(conn) {
        if (projects) {
            return
        }
        try {
            projects = await conn.db(process.env.RECHNER_NS).collection("projects")
            } catch (e) {
            console.error(
                `Unable to establish a collection handle in ProjectsDAO: ${e}`,
            )
        }
    }

    static async getProjects({
        page=0,
        projectsPerPage=20,
    } = {}) {
        let cursor

        try {
            cursor = await projects
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { projectsList: [], totalNumProjects: 0 }
        }

		const displayCursor = cursor.limit(projectsPerPage).skip(projectsPerPage * page)

		try {
		    const projectsList = await displayCursor.toArray()
		    const totalNumProjects = await projects.countDocuments(query)

			return { projectsList, totalNumProjects}
		} catch (e) {
		    console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
			)
			return { projectsList: [], totalNumProjects: 0 }
		}
    }

    static async addProject(projectname, userId, project, date) {
        try {
            const projectDoc = {
                projectname: projectname,
                userId: userId,
                project : project ,
                date: date,
            }

            return await projects.insertOne(projectDoc)

        } catch (e) {
            console.error(`Unable to post project: ${e}`)
            return { error: e  }
        }
    }

    static async updateProject(projectId, projectname, password, email, date) {
        try {
            const updateResponse = await projects.updateOne(
                        { _id: ObjectId(projectId) },
                        { $set: { email: email, date: date, password: password, projectname:projectname   }  },
            )

                  return updateResponse

        } catch (e) {
                  console.error(`Unable to update project: ${e}`)
                  return { error: e  }

        }

    }

    static async deleteProject(projectId, password) {

        try {
            const deleteResponse = await project.deleteOne({
                        _id: ObjectId(projectId),
                        password: password,

            })

                  return deleteResponse

        } catch (e) {
                  console.error(`Unable to delete project: ${e}`)
                  return { error: e  }

        }

    }
/*
    static async getProjectsFiltered({
        filters = null,
        page = 0,
        projectsPerPage = 20,
    } = {}) {
		let query
		if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
			} else if ("cuisine" in filters) {
			    query = { "cuisine": { $eq: filters["cuisine"] } }
			} else if ("zipcode" in filters) {
				query = { "address.zipcode": { $eq: filters["zipcode"] } }
			}
		}

        let cursor

        try {
            cursor = await projects
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { projectsList: [], totalNumProjects: 0 }
		}

		const displayCursor = cursor.limit(projectsPerPage).skip(projectsPerPage * page)

		try {
		    const projectsList = await displayCursor.toArray()
		    const totalNumProjects = await projects.countDocuments(query)

			return { projectsList, totalNumProjects}
		} catch (e) {
		    console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
			)
			return { projectsList: [], totalNumProjects: 0 }
		}
	}
    static async getProjectByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
					    _id: new ObjectId(id),
                    },
				},
				{
					$lookup: {
                        from: "reviews",
						let: {
						    id: "$_id",
						},
						pipeline: [
						    {
							    $match: {
								    $expr: {
									    $eq: ["$project_id", "$$id"],
									},
                                },
							},
							{
							    $sort: {
								    date: -1,
								},
						    },
						],
						as: "reviews",
					},
				},
				{
				    $addFields: {
					    reviews: "$reviews",
					},
				},
            ]
        return await projects.aggregate(pipeline).next()
        } catch (e) {
		console.error(`Something went wrong in getProjectByID: ${e}`)
		throw e
	    }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
		    console.error(`Unable to get cuisines, ${e}`)
			return cuisines
		}
	}*/
}

