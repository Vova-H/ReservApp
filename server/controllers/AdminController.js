import AdminService from "../services/adminService.js";


class AdminController {
    adminService;

    constructor(adminService) {
        this.adminService = adminService
    }

    async getAllUsers() {
        return this.adminService.getAllUsers()
    }

    async getAllReservations() {
        return this.adminService.getAllReservations()
    }
}

const adminController = new AdminController(new AdminService())

export default adminController
