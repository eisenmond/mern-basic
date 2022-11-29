import express from "express"
import UsersCtrl from "./users.controller.js"
import ProjectsCtrl from "./projects.controller.js"
import ContactsCtrl from "./contacts.controller.js"
import RechnersCtrl from "./rechners.controller.js"
const router = express.Router()

//router.route("/users").get((req, res) => res.send("hello World"))

router
    .route("/users")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiPostUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser)


router
    .route("/projects")
    .get(ProjectsCtrl.apiGetProjects)
    .post(ProjectsCtrl.apiPostProject)
    .put(ProjectsCtrl.apiUpdateProject)
    .delete(ProjectsCtrl.apiDeleteProject)


router
    .route("/contacts")
    .get(ContactsCtrl.apiGetContacts)
    .post(ContactsCtrl.apiPostContact)
    .put(ContactsCtrl.apiUpdateContact)
    .delete(ContactsCtrl.apiDeleteContact)


router
    .route("/rechners")
    .get(RechnersCtrl.apiGetRechners)
    .post(RechnersCtrl.apiPostRechner)
    .put(RechnersCtrl.apiUpdateRechner)
    .delete(RechnersCtrl.apiDeleteRechner)

export default router
