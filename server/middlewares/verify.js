// So here I will have to create a middleware so that I can bring the data verification logic over here so
// that it can be used everywhere

async function verifyDateMiddleware(req, res, next) {
    try {
        if (new Date(req.body.deadline) == "Invalid Date") {
            return res.status(400).json({ error: 'Deadline is an invalid' });
        }
        //to convert into UTC0
        let deadline = new Date(req.body.deadline);
        let current = new Date(); //current UTC0
    
        let mins = ((deadline - current)) / (1000 * 60); //diff in mins
        let days = ((deadline - current)) / (1000 * 60 * 60 * 24); //diff in days
        
        //case 2 & 3 : cannot be within 30 mins of current time and cannot be after 30 days
        if (mins < 30 || days > 30) {
            return res.status(400).json({ error: 'Deadline should be more than 30mins & less than 30 days or backdated' });
        }

        next();
    } 
    catch (error) {
        return res.status(401).json({ error: 'Invalid date format' });
    }
}

export default verifyDateMiddleware;