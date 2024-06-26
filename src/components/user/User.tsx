import * as React from "react";
import { useSession } from "next-auth/react";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Page } from "../Dashboard";
import { UserRole } from "@/common/config";
import { api } from "@/utils/api";
import { Typography } from "@mui/material";
import { getRoleName } from "@/utils/role";

const User: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}> = ({ setPage }) => {
  const { data: session } = useSession();

  const {
    data: userRoleChangeApplicantionCount,
    refetch: refetchUserRoleChangeApplicantionCount,
  } = api.userRoleChangeApplicantion.count.useQuery();
  const createUserRoleChangeApplication =
    api.userRoleChangeApplicantion.create.useMutation({
      onSuccess: () => {
        refetchUserRoleChangeApplicantionCount();
      },
    });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "rows",
          }}
        >
          <Stack direction="row" spacing={2}>
            {userRoleChangeApplicantionCount === 0 ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<PersonAddAlt1OutlinedIcon />}
                  onClick={() => {
                    //setPage(Page.CreateStudent);
                    createUserRoleChangeApplication.mutate({
                      destType: UserRole.STUDENT.toString(),
                    });
                  }}
                >
                  申请变更为{getRoleName(UserRole.STUDENT)}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PersonAddAlt1OutlinedIcon />}
                  onClick={() => {
                    //setPage(Page.CreateLecturer);
                    createUserRoleChangeApplication.mutate({
                      destType: UserRole.LECTURER.toString(),
                    });
                  }}
                >
                  申请变更为{getRoleName(UserRole.LECTURER)}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PersonAddAlt1OutlinedIcon />}
                  onClick={() => {
                    //setPage(Page.CreateExecutor);
                    createUserRoleChangeApplication.mutate({
                      destType: UserRole.EXECUTOR.toString(),
                    });
                  }}
                >
                  申请变更为{getRoleName(UserRole.EXECUTOR)}
                </Button>
              </>
            ) : (
              <Typography variant="h6">
                已申请，请等待{getRoleName(UserRole.ADMIN)}审核！
              </Typography>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default User;
