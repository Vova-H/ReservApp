import AdminService from "../services/adminService.js";
import {validationResult} from "express-validator";


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

    async getWorkingTime() {
        return this.adminService.getWorkingTime()
    }

    async changeWorkingTime(req) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return errors
        }
        const {startOfDay, endOfDay} = req.body
        return this.adminService.changeWorkingTime(startOfDay, endOfDay)
    }
}

const adminController = new AdminController(new AdminService())

export default adminController
