import RechnersDAO from "../dao/rechnersDAO.js"

export default class RechnersController {

    static async apiPostRechner(req, res, next) {
        try {
                  const rechnername = req.body.rechnername
                  const password = req.body.password
                  const email = req.body.email

            console.log(rechnername)
            console.log(password)
            console.log(email)


            const date = new Date()

            const RechnerResponse = await RechnersDAO.addRechner(
                        rechnername,
                        password,
                        email,
                        date,
            )
            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiUpdateRechner(req, res, next) {
        try {
            const rechnerId = req.body._id
            const rechnername = req.body.rechnername
            const date = new Date()
            const password = req.body.password
            const email = req.body.email
            const rechnerResponse = await RechnersDAO.updateRechner(
                rechnerId,
                rechnername,
                password,
                email,
                date,

            )

            var { error  } = rechnerResponse
            if (error) {
                        res.status(400).json({ error  })

            }

            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiDeleteRechner(req, res, next) {
        try {
                  const rechnerId = req.query._id
                  const password = req.body.password
                  console.log(rechnerId)
            const rechnerResponse = await RechnersDAO.deleteRechner(
                        rechnerId,
                        password,

            )
                  res.json({ status: "success"  })

        } catch (e) {
                  res.status(500).json({ error: e.message  })

        }

    }

    static async apiGetRechners(req, res, next){
        console.log("never gonna give you up")
    }
/*
    static async apiGetRechners(req, res, next) {
            const rechnersPerPage = req.query.rechnersPerPage ? parseInt(req.query.rechnersPerPage, 10) : 20
            const page = req.query.page ? parseInt(req.query.page, 10) : 0

            let filters = {}
        if (req.query.cuisine) {
                  filters.cuisine = req.query.cuisine

        } else if (req.query.zipcode) {
                  filters.zipcode = req.query.zipcode

        } else if (req.query.name) {
                  filters.name = req.query.name

        }

        const { rechnersList, totalNumRechners} = await RechnersDAO.getRechners({
                  filters,
                  page,
                  rechnersPerPage,

        })

        let response = {
                  rechners: rechnersList,
                  page: page,
                  filters: filters,
                  entries_per_page: rechnersPerPage,
                  total_results: totalNumRechners,

        }
            res.json(response)

    }
    static async apiGetRechnerById(req, res, next) {
        try {
                  let id = req.params.id || {}
                  let rechner = await RechnersDAO.getRechnerByID(id)
            if (!rechner) {
                        res.status(404).json({ error: "Not found"  })
                        return

            }
                  res.json(rechner)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }

    static async apiGetRechnerCuisines(req, res, next) {
        try {
                  let cuisines = await RechnersDAO.getCuisines()
                  res.json(cuisines)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }
*/
}
