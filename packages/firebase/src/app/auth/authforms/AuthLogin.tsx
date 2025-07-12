"use client";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import { Form, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import useAuth from "@/app/guards/authGuard/UseAuth";
import useMounted from "@/app/guards/authGuard/UseMounted";
import { Icon } from "@iconify/react";
const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const mounted = useMounted();
  const { signin } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "demo@demo.com",
      password: "demo123",
      submit: null,
    },

    validationSchema: LoginSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }: any) => {
      try {
        await signin(values.email, values.password);

        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
      } catch (err: any) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <>
      {title ? <p>{title}</p> : null}

      {subtext}
      {errors.submit && (
        <div className="mt-4">
          <Alert
            color={"lighterror"}
            icon={() => (
              <Icon
                icon="solar:info-circle-outline"
                className="me-3"
                height={40}
              />
            )}
          >
            {errors.submit}
          </Alert>
        </div>
      )}
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="Username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              sizing="md"
              className={`form-control ${
                touched.email && errors.email ? "error-border" : ""
              }`}
              {...getFieldProps("email")}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="userpwd" value="Password" />
            </div>
            <TextInput
              id="userpwd"
              type="password"
              sizing="md"
              className={`form-control ${
                touched.password && errors.password ? "error-border" : ""
              }`}
              {...getFieldProps("password")}
            />
          </div>
          <div className="flex justify-between my-5">
            <div className="flex items-center gap-2">
              <Checkbox id="accept" className="checkbox" />
              <Label
                htmlFor="accept"
                className="opacity-90 font-normal cursor-pointer"
              >
                Remeber this Device
              </Label>
            </div>
            <Link href={"/"} className="text-primary text-sm font-medium">
              Forgot Password ?
            </Link>
          </div>
          <Button
            color={"primary"}
            type="submit"
            className=" w-full"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
        </Form>
      </FormikProvider>
      {subtitle}
    </>
  );
};

export default AuthLogin;
