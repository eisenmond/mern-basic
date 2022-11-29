import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"
import ProjectsDAO from "./dao/projectsDAO.js"
import ContactsDAO from "./dao/contactsDAO.js"
import RechnersDAO from "./dao/rechnersDAO.js"
dotenv.config()
const MongoClient =  mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
	  process.env.RECHNER_DB_URI,
	  {
		      wtimeout: 2500,}
	  )
  .catch(err => {
	      console.error(err.stack)
	      process.exit(1)
	    })
  .then(async client => {
      await UsersDAO.injectDB(client)
      await ProjectsDAO.injectDB(client)
      await ContactsDAO.injectDB(client)
      await RechnersDAO.injectDB(client)
	      app.listen(port, () => {
		            console.log(`listening on port ${port}`)
		          })
	    })



