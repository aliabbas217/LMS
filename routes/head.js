var express=require("express");
var router= express.Router();
//GET Routes
router.get('/',function(req,res,next){
    res.send("Head Dashboard");
});
router.post('/head/assigncourse/:cid/:tid', async (req, res) => {
  try {
    const courseId = req.params.cid;
    const teacherId = req.params.tid;

    // Find the course by id
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Find the teacher by id
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if the teacher's department matches the course's department
    if (course.department !== teacher.department) {
      return res.status(400).json({ message: 'Teacher and course department mismatch' });
    }

    // Assign the teacher to the course
    course.teachers.push({ tid: teacher._id });
    await course.save();

    res.status(200).json({ message: 'Teacher assigned to the course successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router;