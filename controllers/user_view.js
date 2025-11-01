const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.createAdmin = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingUser = await User.findOne({ email: email, phone: phone, surname: surname })
        if (existingUser) {
            return res.status(400).json({ message: 'Admin already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const admin = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'Admin',
            phone
        });
        const newAdmin = await admin.save();
        const returnAdmin = {
            _id: newAdmin._id,
            title: newAdmin.title,
            surname: newAdmin.surname,
            middlename: newAdmin.middlename,
            lastname: newAdmin.lastname,
            email: newAdmin.email,
            password: newAdmin.password,
            role: newAdmin.role,
            phone: newAdmin.phone,
        }
        res.status(201).json({ message: 'Admin created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }).select("-password -_v")
        res.status(200).json(admins)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id).select('-password -_v')
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        await admin.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.createSchool_admin = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingUser = await User.findOne({ email: email, phone: phone, surname: surname })
        if (existingUser) {
            return res.status(400).json({ message: 'School_Admin already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const School_admin = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'School_admin',
            phone
        });
        const newSchool_Admin = await School_admin.save();
        const returnSchool_Admin = {
            _id: newSchool_Admin._id,
            title: newSchool_Admin.title,
            surname: newSchool_Admin.surname,
            middlename: newSchool_Admin.middlename,
            lastname: newSchool_Admin.lastname,
            email: newSchool_Admin.email,
            password: newSchool_Admin.password,
            role: newSchool_Admin.role,
            phone: newSchool_Admin.phone,
        }
        res.status(201).json({ message: 'School_Admin created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

exports.getSchool_admins = async (req, res) => {
    try {
        const school_admins = await User.find({ role: 'School_admin' }).select('-password -_v')
        res.status(200).json(school_admins);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getSchool_admin = async (req, res) => {
    try {
        const school_admin = await User.findById(req.params.id).select('-password -_v')
        res.status(200).json(school_admin);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.updateSchool_admin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await school_admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteSchool_admin = async (req, res) => {
    try {
        const school_admin = await User.findById(req.params.id);
        if (!school_admin) return res.status(404).json({ message: 'School admin not found' });
        await school_admin.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'School admin deleted succesfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProperietor = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingUser = await User.findOne({ email: email, phone: phone, surname: surname })
        if (existingUser) {
            return res.status(400).json({ message: 'Properietor already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const properietor = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'Properietor',
            phone
        });
        const newProperietor = await properietor.save();
        const returnProperietor = {
            _id: newProperietor._id,
            title: newProperietor.title,
            surname: newProperietor.surname,
            middlename: newProperietor.middlename,
            lastname: newProperietor.lastname,
            email: newProperietor.email,
            password: newProperietor.password,
            role: newProperietor.role,
            phone: newProperietor.phone,
        }
        res.status(201).json({ message: 'properietor created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getProperietors = async (req, res) => {
    try {
        const properietors = await User.find({ role: 'Properietor' }).select('-password -_v')
        res.status(200).json(properietors);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getProperietor = async (req, res) => {
    try {
        const properietor = await User.findById(req.params.id).select('-password -_v')
        res.status(200).json(properietor);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateProperietor = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProperietor = async (req, res) => {
    try {
        const properietor = await User.findById(req.params.id);
        if (!properietor) return res.status(404).json({ message: 'Properietor not found' });
        await properietor.deleteOne({ _id: req.params.id });
        await properietor.deleteOne({ message: 'Properietor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProperietress = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingUser = await User.findOne({ email: email, phone: phone, surname: surname })
        if (existingUser) {
            return res.status(400).json({ message: 'Properietress already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const properietress = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'Properietress',
            phone
        });
        const Properietress = await properietress.save();
        const returnProperietress = {
            _id: Properietress._id,
            title: Properietress.title,
            surname: Properietress.surname,
            middlename: Properietress.middlename,
            lastname: Properietress.lastname,
            email: Properietress.email,
            password: Properietress.password,
            role: Properietress.role,
            phone: Properietress.phone,
        }
        res.status(201).json({ message: 'Properietress created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getProperietresses = async (req, res) => {
    try {
        const properietresses = await User.find({ role: 'Properietresses' }).select('-password -_v')
        res.status(200).json(properietresses);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getProperietress = async (req, res) => {
    try {
        const properietress = await User.findById(req.params.id).select('-password -_v')
        res.status(200).json(properietress);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateProperietress = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProperietress = async (req, res) => {
    try {
        const properietress = await User.findById(req.params.id);
        if (!properietress) return res.status(404).json({ message: 'Properietress not found' });
        await properietress.deleteOne({ _id: req.params.id });
        await properietress.deleteOne({ message: 'Properietress deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createPrincipal = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingPrincipal = await User.findOne({ email: email, phone: phone, surname: surname })
        if (existingPrincipal) {
            return res.status(400).json({ message: 'Principal already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const principal = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'Principal',
            phone,
            staffNo,
            address
        });
        const newPrincipal = await principal.save();
        const returnPrincipal = {
            _id: newPrincipal._id,
            title: newPrincipal.title,
            surname: newPrincipal.surname,
            middlename: newPrincipal.middlename,
            lastname: newPrincipal.lastname,
            email: newPrincipal.email,
            password: newPrincipal.password,
            role: newPrincipal.role,
            phone: newPrincipal.phone,
            staffNo: newPrincipal.staffNo,
            address: newPrincipal.address
        }
        res.status(201).json({ message: 'Principal created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.getPrincipals = async (req, res) => {
    try {
        const principals = await User.find({ role: 'Principal' }).select('-password -_v')
        res.status(200).json(principals);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getPrincipal = async (req, res) => {
    try {
        const principal = principal.findById(req.params.id).select('-password -_v')
        res.status(200).json(principal);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updatePrincipal = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deletePrincipal = async (req, res) => {
    try {
        const Principal = await User.findById(req.params.id);
        if (!Principal) return res.status(404).json({ message: 'Principal not found' });
        await Principal.deleteOne({ _id: req.params.id });
        await Principal.deleteOne({ message: 'Principal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createViceHeadteacher = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingViceHeadteacher = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
        if (existingViceHeadteacher) {
            return res.status(400).json({ message: 'ViceHeadteacher already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const viceHeadteacher = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'ViceHeadteacher',
            phone,
            staffNo,
            address
        });
        const newViceHeadteacher = await viceHeadteacher.save();
        const returnViceHeadteacher = {
            _id: newViceHeadteacher._id,
            title: newViceHeadteacher.title,
            surname: newViceHeadteacher.surname,
            middlename: newViceHeadteacher.middlename,
            lastname: newViceHeadteacher.lastname,
            email: newViceHeadteacher.email,
            password: newViceHeadteacher.password,
            role: newViceHeadteacher.role,
            phone: newViceHeadteacher.phone,
            staffNo: newViceHeadteacher.staffNo,
            address: newViceHeadteacher.address
        }
        res.status(201).json({ message: 'ViceHeadteacher created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getViceHeadteachers = async (req, res) => {
    try {
        const ViceHeadteachers = await User.find({ role: 'ViceHeadteacher' }).select('-password -_v')
        res.status(200).json(ViceHeadteachers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getViceHeadteacher = async (req, res) => {
    try {
        const ViceHeadteacher = ViceHeadteacher.findById(req.params.id).select('-password -_v')
        res.status(200).json(ViceHeadteacher);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateViceHeadteacher = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteViceHeadteacher = async (req, res) => {
    try {
        const ViceHeadteacher = await User.findById(req.params.id);
        if (!ViceHeadteacher) return res.status(404).json({ message: 'ViceHeadteacher not found' });
        await ViceHeadteacher.deleteOne({ _id: req.params.id });
        await ViceHeadteacher.deleteOne({ message: 'ViceHeadteacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createBursar = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingBursar = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
        if (existingBursar) {
            return res.status(400).json({ message: 'Bursar already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const bursar = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'Bursar',
            phone,
            staffNo,
            address
        });
        const newBursar = await bursar.save();
        const returnBursar = {
            _id: newBursar._id,
            title: newBursar.title,
            surname: newBursar.surname,
            middlename: newBursar.middlename,
            lastname: newBursar.lastname,
            email: newBursar.email,
            password: newBursar.password,
            role: newBursar.role,
            phone: newBursar.phone,
            staffNo: newBursar.staffNo,
            address: newBursar.address
        }
        res.status(201).json({ message: 'Bursar created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getBursars = async (req, res) => {
    try {
        const Bursars = await User.find({ role: 'Bursar' }).select('-password -_v')
        res.status(200).json(Bursars);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getBursar = async (req, res) => {
    try {
        const Bursar = Bursar.findById(req.params.id).select('-password -_v')
        res.status(200).json(Bursar);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateBursar = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteBursar = async (req, res) => {
    try {
        const Bursar = await User.findById(req.params.id);
        if (!Bursar) return res.status(404).json({ message: 'Bursar not found' });
        await Bursar.deleteOne({ _id: req.params.id });
        await Bursar.deleteOne({ message: 'Bursar deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createVicePrincipal = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingVicePrincipal = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
        if (existingVicePrincipal) {
            return res.status(400).json({ message: 'VicePrincipal already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const vicePrincipal = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'VicePrincipal',
            phone,
            staffNo,
            address
        });
        const newVicePrincipal = await vicePrincipal.save();
        const returnVicePrincipal = {
            _id: newVicePrincipal._id,
            title: newVicePrincipal.title,
            surname: newVicePrincipal.surname,
            middlename: newVicePrincipal.middlename,
            lastname: newVicePrincipal.lastname,
            email: newVicePrincipal.email,
            password: newVicePrincipal.password,
            role: newVicePrincipal.role,
            phone: newVicePrincipal.phone,
            staffNo: newVicePrincipal.staffNo,
            address: newVicePrincipal.address
        }
        res.status(201).json({ message: 'VicePrincipal created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getVicePrincipals = async (req, res) => {
    try {
        const Viceprincipals = await User.find({ role: 'VicePrincipal' }).select('-password -_v')
        res.status(200).json(Viceprincipals);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getVicePrincipal = async (req, res) => {
    try {
        const Viceprincipal = Viceprincipal.findById(req.params.id).select('-password -_v')
        res.status(200).json(Viceprincipal);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updatevicePrincipal = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteVicePrincipal = async (req, res) => {
    try {
        const VicePrincipal = await User.findById(req.params.id);
        if (!VicePrincipal) return res.status(404).json({ message: 'VicePrincipal not found' });
        await VicePrincipal.deleteOne({ _id: req.params.id });
        await VicePrincipal.deleteOne({ message: 'VicePrincipal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createHeadTeacher = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingHeadTeacher = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
        if (existingHeadTeacher) {
            return res.status(400).json({ message: 'HeadTeacher already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const headTeacher = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'HeadTeacher',
            phone,
            staffNo,
            address
        });
        const newHeadTeacher = await headTeacher.save();
        const returnHeadTeacher = {
            _id: newHeadTeacher._id,
            title: newHeadTeacher.title,
            surname: newHeadTeacher.surname,
            middlename: newHeadTeacher.middlename,
            lastname: newHeadTeacher.lastname,
            email: newHeadTeacher.email,
            password: newHeadTeacher.password,
            role: newHeadTeacher.role,
            phone: newHeadTeacher.phone,
            staffNo: newHeadTeacher.staffNo,
            address: newHeadTeacher.address
        }
        res.status(201).json({ message: 'HeadTeacher created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getHeadTeachers = async (req, res) => {
    try {
        const HeadTeachers = await User.find({ role: 'HeadTeacher' }).select('-password -_v')
        res.status(200).json(HeadTeachers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getHeadTeacher = async (req, res) => {
    try {
        const HeadTeacher = HeadTeacher.findById(req.params.id).select('-password -_v')
        res.status(200).json(HeadTeacher);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateheadteacher = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteHeadTeacher = async (req, res) => {
    Vice
    try {
        const HeadTeacher = await User.findById(req.params.id);
        if (!HeadTeacher) return res.status(404).json({ message: 'HeadTeacher not found' });
        await HeadTeacher.deleteOne({ _id: req.params.id });
        await HeadTeacher.deleteOne({ message: 'HeadTeacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createAuditor = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        const existingAuditor = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
        if (existingAuditor) {
            return res.status(400).json({ message: 'Auditor already exists!!' })
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const auditor = new User({
            title,
            surname,
            middlename,
            lastname,
            email,
            password: hashedPassword,
            role: 'Auditor',
            phone,
            staffNo,
            address
        });
        const newAuditor = await auditor.save();
        const returnAuditor = {
            _id: newAuditor._id,
            title: newAuditor.title,
            surname: newAuditor.surname,
            middlename: newAuditor.middlename,
            lastname: newAuditor.lastname,
            email: newAuditor.email,
            password: newAuditor.password,
            role: newAuditor.role,
            phone: newAuditor.phone,
            staffNo: newAuditor.staffNo,
            address: newAuditor.address
        }
        res.status(201).json({ message: 'Auditor created succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getAuditors = async (req, res) => {
    try {
        const Auditors = await User.find({ role: 'Auditor' }).select('-password -_v')
        res.status(200).json(Auditors);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAuditor = async (req, res) => {
    try {
        const Auditor = Auditor.findById(req.params.id).select('-password -_v')
        res.status(200).json(Auditor);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateAuditor = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'admin not found!' })
        const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                admin[field] = req.body[field];
            }
        });
        const updatedUser = await admin.save();
        res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteAuditor = async (req, res) => {
    try {
        const Auditor = await User.findById(req.params.id);
        if (!Auditor) return res.status(404).json({ message: 'Auditor not found' });
        await Auditor.deleteOne({ _id: req.params.id });
        await Auditor.deleteOne({ message: 'Auditor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTeacher = async (req, res) => {
    try {
        const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
        if (role !== 'Teacher') {
            return res.status(400).json({ message: 'Invaild role. This endpoint is only for teachers.' });
        }
        if (!title === '' || !surname === '' || !middlename === '' || !lastname === '' || !email === '' || !password === '' || !role === '' || !phone === '' || !address === '') {
            return res.status(400).json({ message: 'All field are required' })
        }
        if (!staffNo || staffNo.trim() === "") {
            return res.status(400).json({ message: 'staffNo is required for teachers'});
        }
            const existingTeacher = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
            if (existingTeacher) {
                return res.status(400).json({ message: 'Teacher already exists!!' })
            }
            const hashedPassword = await bcrypt.hash(password, 13);
            const teacher = new User({
                title,
                surname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
                role: 'Teacher',
                phone,
                staffNo,
                address
            });

            await teacher.save();
            res.status(201).json({ message: 'Teacher created succesfully' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
exports.getTeachers = async (req, res) => {
        try {
            const Teachers = await User.find({ role: 'Teacher' }).select('-password -_v')
            res.status(200).json(Teachers);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.getTeacher = async (req, res) => {
        try {
            const teacher = await User.findById(req.params.id).select('-password -_v')
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.updateTeacher = async (req, res) => {
        try {
            const admin = await User.findById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'Teacher not found!' })
            const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
            updatableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    admin[field] = req.body[field];
                }
            });
            const updatedUser = await admin.save();
            res.status(200).json({ message: 'Teacher updated succesfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    exports.deleteTeacher = async (req, res) => {
        try {
            const Teacher = await User.findById(req.params.id);
            if (!Teacher) return res.status(404).json({ message: 'Teacher not found' });
            await Teacher.deleteOne({ _id: req.params.id });
            await Teacher.deleteOne({ message: 'Teacher deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    exports.createStudent = async (req, res) => {
        try {
            const {surname, middlename, lastname, email, password, role, phone, regNo, address } = req.body;
            if (role !== 'Student') {
                return res.status(400).json({ message: 'Invaild role for this endpoint'})
            }
            if (!surname === '' || !middlename === '' || !lastname === '' || !email === '' || !password === '' || !role === '' || !phone === '' || !regNo === '' || !address === '') {
                return res.status(400).json({ message: 'All field are required' })
            }
            const regExists = await User.findOne({ regNo });
            if (regExists) {
                return res.status(400).json({ message: 'Registration number already exists'});
            }
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, 13);
            const student = new User({
                surname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
                role: 'Student',
                phone,
                regNo,
                address
            });
            const newStudent = await student.save();
            const returnStudent = {
                _id: newStudent._id,
                surname: newStudent.surname,
                middlename: newStudent.middlename,
                lastname: newStudent.lastname,
                email: newStudent.email,
                password: newStudent.password,
                role: newStudent.role,
                phone: newStudent.phone,
                regNo: newStudent.regNo,
                address: newStudent.address
            }
            res.status(201).json({ message: 'Student created succesfully' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    exports.getStudents = async (req, res) => {
        try {
            const Students = await User.find({ role: 'Student' }).select('-password -_v')
            res.status(200).json(Students);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.getStudent = async (req, res) => {
        try {
            const student = await User.findById(req.params.id).select('-password -_v')
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    exports.updateStudent = async (req, res) => {
        try {
            const admin = await User.findById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'admin not found!' })
            const updatableFields = ['surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
            updatableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    admin[field] = req.body[field];
                }
            });
            const updatedUser = await admin.save();
            res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    exports.deleteStudent = async (req, res) => {
        try {
            const Student = await User.findById(req.params.id);
            if (!Student) return res.status(404).json({ message: 'Student not found' });
            await Student.deleteOne({ _id: req.params.id });
            await Student.deleteOne({ message: 'Student deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    exports.createDeanOfStudy = async (req, res) => {
        try {
            const { title, surname, middlename, lastname, email, password, role, phone, staffNo, address } = req.body;
            if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || staffNo === '' || address === '') {
                return res.status(400).json({ message: 'All field are required' })
            }
            const existingDeanOfStudy = await User.findOne({ email: email, phone: phone, surname: surname, staffNo: staffNo })
            if (existingDeanOfStudy) {
                return res.status(400).json({ message: 'DeanOfStudy already exists!!' })
            }
            const hashedPassword = await bcrypt.hash(password, 13);
            const deanOfStudy = new User({
                title,
                surname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
                role: 'DeanOfStudy',
                phone,
                staffNo,
                address
            });
            const newDeanOfStudy = await deanOfStudy.save();
            const returnDeanOfStudy = {
                _id: newDeanOfStudy._id,
                title: newDeanOfStudy.title,
                surname: newDeanOfStudy.surname,
                middlename: newDeanOfStudy.middlename,
                lastname: newDeanOfStudy.lastname,
                email: newDeanOfStudy.email,
                password: newDeanOfStudy.password,
                role: newDeanOfStudy.role,
                phone: newDeanOfStudy.phone,
                staffNo: newDeanOfStudy.staffNo,
                address: newDeanOfStudy.address
            }
            res.status(201).json({ message: 'DeanOfStudy created succesfully' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    exports.getAllDeanOfStudies = async (req, res) => {
        try {
            const deanOfStudys = await User.find({ role: 'DeanOfStudy' }).select('-password -_v')
            res.status(200).json(deanOfStudys);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.getDeanOfStudy = async (req, res) => {
        try {
            const deanOfStudy = deanOfStudy.findById(req.params.id).select('-password -_v')
            res.status(200).json(deanOfStudy);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.updateDeanOfStudy = async (req, res) => {
        try {
            const admin = await User.findById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'admin not found!' })
            const updatableFields = ['title', 'surname', 'middlename', 'lastname', 'email', 'password', 'role', 'phone'];
            updatableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    admin[field] = req.body[field];
                }
            });
            const updatedUser = await admin.save();
            res.status(200).json({ message: 'Admin updated succesfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    exports.deleteDeanOfStudy = async (req, res) => {
        try {
            const DeanOfStudy = await User.findById(req.params.id);
            if (!DeanOfStudy) return res.status(404).json({ message: 'DeanOfStudy not found' });
            await DeanOfStudy.deleteOne({ _id: req.params.id });
            await DeanOfStudy.deleteOne({ message: 'DeanOfStudy deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    exports.createParent = async (req, res) => {
        try {
            const { title, surname, middlename, lastname, email, password, role, phone, address } = req.body;
            if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || address === '') {
                return res.status(400).json({ message: 'All field are required' })
            }
            const existingParent = await User.findOne({ email: email, phone: phone, surname: surname })
            if (existingParent) {
                return res.status(400).json({ message: 'Parent already exists!!' })
            }
            const hashedPassword = await bcrypt.hash(password, 13);
            const parent = new User({
                title,
                surname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
                role: 'Parent',
                phone,
                address
            });
            const newParent = await parent.save();
            const returnParent = {
                _id: newParent._id,
                title: newParent.title,
                surname: newParent.surname,
                middlename: newParent.middlename,
                lastname: newParent.lastname,
                email: newParent.email,
                password: newParent.password,
                role: newParent.role,
                phone: newParent.phone,
                address: newParent.address
            }
            res.status(201).json({ message: 'Parent created succesfully' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    exports.getParents = async (req, res) => {
        try {
            const parents = await User.find({ role: 'Parent' }).select('-password -_v')
            res.status(200).json(parents);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.getParent = async (req, res) => {
        try {
            const parent = parent.findById(req.params.id).select('-password -_v')
            res.status(200).json(parent);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    exports.updateParent = async (req, res) => {
        try {
            const { title, surname, middlename, lastname, email, password, role, phone, address } = req.body;
            if (title === '' || surname === '' || middlename === '' || lastname === '' || email === '' || password === '' || role === '' || phone === '' || address === '') {
                return res.status(404).json({ message: 'All field are required' })
            }
            const parent = await User.findById(req.params.id);
            if (!parent) return res.status(404).json({ message: 'parent not found' })
            parent.title = title;
            parent.surname = surname;
            parent.middlename = middlename;
            parent.lastname = lastname;
            parent.email = email;
            parent.password = password;
            parent.role = role;
            parent.phone = phone;
            parent.address = address;
            const updateUser = await parent.save();
            const returnUser = {
                _id: updateUser._id,
                surname: updateUser.surname,
                middlename: updateUser.middlename,
                lastname: updateUser.lastname,
                email: updateUser.email,
                password: updateUser.password,
                role: updateUser.role,
                phone: updateUser.phone,
                address: updateUser.address,
            };
            res.status(200).json({ message: 'Parent updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    exports.deleteParent = async (req, res) => {
        try {
            const Parent = await User.findById(req.params.id);
            if (!Parent) return res.status(404).json({ message: 'Parent not found' });
            await Parent.deleteOne({ _id: req.params.id });
            await Parent.deleteOne({ message: 'Parent deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    exports.getUsers = async (req, res) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }