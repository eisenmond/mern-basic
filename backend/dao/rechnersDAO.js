import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let rechners

export default class RechnersDAO {
    static async injectDB(conn) {
        if (rechners) {
            return
        }
        try {
            rechners = await conn.db(process.env.RECHNER_NS).collection("rechners")
            } catch (e) {
            console.error(
                `Unable to establish a collection handle in RechnersDAO: ${e}`,
            )
        }
    }

    static async getRechners({
        page=0,
        rechnersPerPage=20,
    } = {}) {
        let cursor

        try {
            cursor = await rechners
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { rechnersList: [], totalNumRechners: 0 }
        }

		const displayCursor = cursor.limit(rechnersPerPage).skip(rechnersPerPage * page)

		try {
		    const rechnersList = await displayCursor.toArray()
		    const totalNumRechners = await rechners.countDocuments(query)

			return { rechnersList, totalNumRechners}
		} catch (e) {
		    console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
			)
			return { rechnersList: [], totalNumRechners: 0 }
		}
    }

    static async addRechner(rechnername, password, email, date) {
        try {
            const rechnerDoc = {
                rechnername: rechnername,
                password: password,
                email: email,
                date: date,
            }

            return await rechners.insertOne(rechnerDoc)

        } catch (e) {
            console.error(`Unable to post rechner: ${e}`)
            return { error: e  }
        }
    }

    static async updateRechner(rechnerId, rechnername, password, email, date) {
        try {
            const updateResponse = await rechners.updateOne(
                        { _id: ObjectId(rechnerId) },
                        { $set: { email: email, date: date, password: password, rechnername:rechnername   }  },
            )

                  return updateResponse

        } catch (e) {
                  console.error(`Unable to update rechner: ${e}`)
                  return { error: e  }

        }

    }

    static async deleteRechner(rechnerId, password) {

        try {
            const deleteResponse = await rechner.deleteOne({
                        _id: ObjectId(rechnerId),
                        password: password,

            })

                  return deleteResponse

        } catch (e) {
                  console.error(`Unable to delete rechner: ${e}`)
                  return { error: e  }

        }

    }
/*
    static async getRechnersFiltered({
        filters = null,
        page = 0,
        rechnersPerPage = 20,
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
            cursor = await rechners
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { rechnersList: [], totalNumRechners: 0 }
		}

		const displayCursor = cursor.limit(rechnersPerPage).skip(rechnersPerPage * page)

		try {
		    const rechnersList = await displayCursor.toArray()
		    const totalNumRechners = await rechners.countDocuments(query)

			return { rechnersList, totalNumRechners}
		} catch (e) {
		    console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
			)
			return { rechnersList: [], totalNumRechners: 0 }
		}
	}
    static async getRechnerByID(id) {
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
									    $eq: ["$rechner_id", "$$id"],
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
        return await rechners.aggregate(pipeline).next()
        } catch (e) {
		console.error(`Something went wrong in getRechnerByID: ${e}`)
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

