const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/date', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
const claimSchema = mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
    },
    post_id: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Insurance" },

    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Claim = mongoose.model("Claim", claimSchema);

const insuranceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Insurance = mongoose.model("Insurance", insuranceSchema);
const main = async () => {
    // Chèn tài liệu 
    const insertedInsurances = await Insurance.insertMany([
        { title: "Lorem1", description: 'Lorem lorem 1', markdown: ' text textttttt' },
        { title: "Lorem2", description: 'Lorem lorem 2', markdown: ' text textttttt' },
        { title: "Lorem3", description: 'Lorem lorem 3', markdown: ' text textttttt' },
        { title: "Lorem4", description: 'Lorem lorem 4', markdown: ' text textttttt' },
        { title: "Lorem5", description: 'Lorem lorem 5', markdown: ' text textttttt' },
    ]);

    // Tạo một mảng ID bảo hiểm
    const insertedInsuranceIds = insertedInsurances.map(
        (insurance) => insurance._id
    );

    // Chèn một tài liệu 
    const insertedClaim = await Claim.create({
        name: 'Hoang',
        email: 'tuantuanhoang@gmail.com',
        post_id: insertedInsuranceIds,
    });
    console.log(insertedClaim);
    const popluatedClaim = await Claim.findById(insertedClaim._id).populate({
        path: "post_id",
    });
};

main();
