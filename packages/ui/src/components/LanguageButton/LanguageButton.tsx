import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {updateUser} from "@sentrei/common/firebase/users";
import {trackEvent} from "@sentrei/common/utils/segment";
import User from "@sentrei/types/models/User";

export default function LanguageButton(): JSX.Element {
  const router = useRouter();
  const {lang} = useTranslation();

  const {user} = React.useContext(AuthContext);

  const [period] = React.useState<User.Language>(lang as User.Language);

  const pathnameNoLang = (): string => {
    if (
      router.pathname === "/" ||
      router.pathname === "/ja" ||
      router.pathname === "/zh"
    ) {
      return "/";
    }
    return router.asPath
      .split("/")
      .filter(section => section !== lang)
      .join("/");
  };

  const handleChange = (event: React.ChangeEvent<{value: unknown}>): void => {
    const language = event.target.value as User.Language;
    if ((event.target.value as User.Language) !== lang) {
      Router.pushI18n({
        url: pathnameNoLang(),
        options: {lang: event.target.value},
      });
    }
    if (user) {
      updateUser({language}, user.uid);
    }
    trackEvent("Change Language", {lang: event.target.value as User.Language});
  };

  return (
    <FormControl>
      <TextField
        fullWidth
        id="select"
        select
        size="medium"
        variant="outlined"
        value={period}
        onChange={handleChange}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ja">日本語</MenuItem>
        <MenuItem value="zh">中文</MenuItem>
      </TextField>
    </FormControl>
  );
}
