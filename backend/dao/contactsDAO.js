import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let contacts

export default class ContactsDAO {
    static async injectDB(conn) {
        if (contacts) {
            return
        }
        try {
            contacts = await conn.db(process.env.RECHNER_NS).collection("contacts")
            } catch (e) {
            console.error(
                `Unable to establish a collection handle in ContactsDAO: ${e}`,
            )
        }
    }

    static async getContacts({
        page=0,
        contactsPerPage=20,
    } = {}) {
        let cursor

        try {
            cursor = await contacts
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { contactsList: [], totalNumContacts: 0 }
        }

		const displayCursor = cursor.limit(contactsPerPage).skip(contactsPerPage * page)

		try {
		    const contactsList = await displayCursor.toArray()
		    const totalNumContacts = await contacts.countDocuments(query)

			return { contactsList, totalNumContacts}
		} catch (e) {
		    console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
			)
			return { contactsList: [], totalNumContacts: 0 }
		}
    }

    static async addContact(contactname, password, email, date) {
        try {
            const contactDoc = {
                contactname: contactname,
                password: password,
                email: email,
                date: date,
            }

            return await contacts.insertOne(contactDoc)

        } catch (e) {
            console.error(`Unable to post contact: ${e}`)
            return { error: e  }
        }
    }

    static async updateContact(contactId, contactname, password, email, date) {
        try {
            const updateResponse = await contacts.updateOne(
                        { _id: ObjectId(contactId) },
                        { $set: { email: email, date: date, password: password, contactname:contactname   }  },
            )

                  return updateResponse

        } catch (e) {
                  console.error(`Unable to update contact: ${e}`)
                  return { error: e  }

        }

    }

    static async deleteContact(contactId, password) {

        try {
            const deleteResponse = await contact.deleteOne({
                        _id: ObjectId(contactId),
                        password: password,

            })

                  return deleteResponse

        } catch (e) {
                  console.error(`Unable to delete contact: ${e}`)
                  return { error: e  }

        }

    }
/*
    static async getContactsFiltered({
        filters = null,
        page = 0,
        contactsPerPage = 20,
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
            cursor = await contacts
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { contactsList: [], totalNumContacts: 0 }
		}

		const displayCursor = cursor.limit(contactsPerPage).skip(contactsPerPage * page)

		try {
		    const contactsList = await displayCursor.toArray()
		    const totalNumContacts = await contacts.countDocuments(query)

			return { contactsList, totalNumContacts}
		} catch (e) {
		    console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
			)
			return { contactsList: [], totalNumContacts: 0 }
		}
	}
    static async getContactByID(id) {
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
									    $eq: ["$contact_id", "$$id"],
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
        return await contacts.aggregate(pipeline).next()
        } catch (e) {
		console.error(`Something went wrong in getContactByID: ${e}`)
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

