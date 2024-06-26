import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CourseForm from "./CourseForm";
import Review from "./Review";
import { api } from "@/utils/api";

import { type Course } from "@prisma/client";
import { Page } from "../Dashboard";

const Checkout: React.FC<{
  refetchCourses: any;
  setDataTableView: React.Dispatch<React.SetStateAction<Page>>;
}> = ({ refetchCourses, setDataTableView }) => {
  const createCourse = api.course.create.useMutation({
    onSuccess: () => {
      void refetchCourses();
    },
  });
  const [course, setCourse] = React.useState<Course>({});
  const [lecturerName, setLecturerName] = React.useState("");
  const [executorName, setExecutorName] = React.useState("");

  const steps = ["录入课程信息", "确认课程信息"];
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <CourseForm
            course={course}
            setCourse={setCourse}
            setLecturerName={setLecturerName}
            setExecutorName={setExecutorName}
          />
        );
      case 1:
        return (
          <Review
            course={course}
            lecturerName={lecturerName}
            executorName={executorName}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length) {
      setDataTableView(Page.Dashboard);
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            新建课程
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                课程新建成功
              </Typography>
              <Typography variant="subtitle1">课程新建成功</Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  返回
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    上一步
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => {
                    if (activeStep === steps.length - 1) {
                      createCourse.mutate({
                        ...course,
                        income: 0,
                      });
                      setCourse({});
                    }
                    handleNext();
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "提交" : "下一步"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
