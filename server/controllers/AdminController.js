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

    async changeWorkingTime(req) {
        const {startOfDay, endOfDay} = req.body
        return this.adminService.changeWorkingTime(startOfDay, endOfDay)
    }
}

const adminController = new AdminController(new AdminService())

export default adminController
