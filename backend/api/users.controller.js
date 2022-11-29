import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {

    static async apiPostUser(req, res, next) {
        try {
                  const username = req.body.username
                  const password = req.body.password
                  const email = req.body.email

            console.log(username)
            console.log(password)
            console.log(email)


            const date = new Date()

            const UserResponse = await UsersDAO.addUser(
                        username,
                        password,
                        email,
                        date,
            )
            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiUpdateUser(req, res, next) {
        try {
            const userId = req.body._id
            const username = req.body.username
            const date = new Date()
            const password = req.body.password
            const email = req.body.email
            const userResponse = await UsersDAO.updateUser(
                userId,
                username,
                password,
                email,
                date,

            )

            var { error  } = userResponse
            if (error) {
                        res.status(400).json({ error  })

            }

            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiDeleteUser(req, res, next) {
        try {
                  const userId = req.query._id
                  const password = req.body.password
                  console.log(userId)
            const userResponse = await UsersDAO.deleteUser(
                        userId,
                        password,

            )
                  res.json({ status: "success"  })

        } catch (e) {
                  res.status(500).json({ error: e.message  })

        }

    }

    static async apiGetUsers(req, res, next){
        console.log("never gonna give you up")
    }
/*
    static async apiGetUsers(req, res, next) {
            const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
            const page = req.query.page ? parseInt(req.query.page, 10) : 0

            let filters = {}
        if (req.query.cuisine) {
                  filters.cuisine = req.query.cuisine

        } else if (req.query.zipcode) {
                  filters.zipcode = req.query.zipcode

        } else if (req.query.name) {
                  filters.name = req.query.name

        }

        const { usersList, totalNumUsers} = await UsersDAO.getUsers({
                  filters,
                  page,
                  usersPerPage,

        })

        let response = {
                  users: usersList,
                  page: page,
                  filters: filters,
                  entries_per_page: usersPerPage,
                  total_results: totalNumUsers,

        }
            res.json(response)

    }
    static async apiGetUserById(req, res, next) {
        try {
                  let id = req.params.id || {}
                  let user = await UsersDAO.getUserByID(id)
            if (!user) {
                        res.status(404).json({ error: "Not found"  })
                        return

            }
                  res.json(user)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }

    static async apiGetUserCuisines(req, res, next) {
        try {
                  let cuisines = await UsersDAO.getCuisines()
                  res.json(cuisines)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }
*/
}
