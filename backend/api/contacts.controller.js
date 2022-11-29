import ContactsDAO from "../dao/contactsDAO.js"

export default class ContactsController {

    static async apiPostContact(req, res, next) {
        try {
                  const contactname = req.body.contactname
                  const password = req.body.password
                  const email = req.body.email

            console.log(contactname)
            console.log(password)
            console.log(email)


            const date = new Date()

            const ContactResponse = await ContactsDAO.addContact(
                        contactname,
                        password,
                        email,
                        date,
            )
            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiUpdateContact(req, res, next) {
        try {
            const contactId = req.body._id
            const contactname = req.body.contactname
            const date = new Date()
            const password = req.body.password
            const email = req.body.email
            const contactResponse = await ContactsDAO.updateContact(
                contactId,
                contactname,
                password,
                email,
                date,

            )

            var { error  } = contactResponse
            if (error) {
                        res.status(400).json({ error  })

            }

            res.json({ status: "success"  })

        } catch (e) {
            res.status(500).json({ error: e.message  })

        }

    }

    static async apiDeleteContact(req, res, next) {
        try {
                  const contactId = req.query._id
                  const password = req.body.password
                  console.log(contactId)
            const contactResponse = await ContactsDAO.deleteContact(
                        contactId,
                        password,

            )
                  res.json({ status: "success"  })

        } catch (e) {
                  res.status(500).json({ error: e.message  })

        }

    }

    static async apiGetContacts(req, res, next){
        console.log("never gonna give you up")
    }
/*
    static async apiGetContacts(req, res, next) {
            const contactsPerPage = req.query.contactsPerPage ? parseInt(req.query.contactsPerPage, 10) : 20
            const page = req.query.page ? parseInt(req.query.page, 10) : 0

            let filters = {}
        if (req.query.cuisine) {
                  filters.cuisine = req.query.cuisine

        } else if (req.query.zipcode) {
                  filters.zipcode = req.query.zipcode

        } else if (req.query.name) {
                  filters.name = req.query.name

        }

        const { contactsList, totalNumContacts} = await ContactsDAO.getContacts({
                  filters,
                  page,
                  contactsPerPage,

        })

        let response = {
                  contacts: contactsList,
                  page: page,
                  filters: filters,
                  entries_per_page: contactsPerPage,
                  total_results: totalNumContacts,

        }
            res.json(response)

    }
    static async apiGetContactById(req, res, next) {
        try {
                  let id = req.params.id || {}
                  let contact = await ContactsDAO.getContactByID(id)
            if (!contact) {
                        res.status(404).json({ error: "Not found"  })
                        return

            }
                  res.json(contact)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }

    static async apiGetContactCuisines(req, res, next) {
        try {
                  let cuisines = await ContactsDAO.getCuisines()
                  res.json(cuisines)

        } catch (e) {
                  console.log(`api, ${e}`)
                  res.status(500).json({ error: e  })

        }

    }
*/
}
