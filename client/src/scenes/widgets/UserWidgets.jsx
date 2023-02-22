import { Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const UserWidgets = () => {
  const [users, setuser] = useState(null);
  const [ToggleLatest, setToggleLatest] = useState(false);
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  const token = useSelector((state) => state.token);
  const token_type = useSelector((state) => state.token_type);
  const HandleToggle = () => {
    setToggleLatest(!ToggleLatest);
    if (ToggleLatest) {
      console.log(" I am true");
      users.sort((a, b) => a.created_at.localeCompare(b.created_at));

      console.log(users);
      setuser(users);
    } else {
      console.log(" I am False");

      users.sort((a, b) => a.first_name.localeCompare(b.first_name));

      console.log(users);
      setuser(users);
    }
  };
  const getUser = async () => {
    const SearchForUser = await fetch(
      "http://frontendapi00test.v6pohbale0-pxr4kozpq3gn.p.temp-site.link/api/users",
      {
        method: "POST",
        headers: { Authorization: `${token_type} ${token}` },
      }
    );

    await SearchForUser.json()
      .then((data) => {
        data.map((item) => {
          const date = new Date(item.created_at);
          // Extract the individual date components using the `getFullYear()`, `getMonth()`, `getDate()`, `getHours()`, `getMinutes()`, and `getSeconds()` methods
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const hours = ("0" + date.getHours()).slice(-2);
          const minutes = ("0" + date.getMinutes()).slice(-2);
          const seconds = ("0" + date.getSeconds()).slice(-2);

          // Format the date string using string concatenation or string interpolation
          const formattedDate = `${year}-${month}-${day}   ${hours}:${minutes}:${seconds}`;
          return { ...(item.created_at = formattedDate) };
        });

        setuser(data);
      })
      .catch((error) => {
        // Handle errors that may occur while fetching or processing the data
        console.error(error);
      });
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!users) return null;

  return (
    <WidgetWrapper>
      {console.log("Users are shown : ", users)}

      {!users && <div> No Users at the moments</div>}

      {users.map((user) => {
        return (
          <FlexBetween
            key={user.id}
            sx={{
              rowGap: "20",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Typography
              gap="0.5rem"
              pb="1.1rem"
              color={dark}
              fontWeight={500}
              sx={{
                "&hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.first_name}
            </Typography>{" "}
            <Typography
              gap="0.5rem"
              pb="1.1rem"
              color={dark}
              fontWeight={500}
              sx={{
                "&hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.email}
            </Typography>{" "}
            <Typography
              gap="0.5rem"
              pb="1.1rem"
              color={dark}
              fontWeight={500}
              sx={{
                "&hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.created_at}
            </Typography>
          </FlexBetween>
        );
      })}

      <Button onClick={HandleToggle}> Toggle Search</Button>
    </WidgetWrapper>
  );
};

export default UserWidgets;
