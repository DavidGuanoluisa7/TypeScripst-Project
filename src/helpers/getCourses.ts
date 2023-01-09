import { courses } from "../data/courses";

export const getCourses = (provider: string) => {
  return courses.filter((course) =>
    course.provider.toLocaleLowerCase().includes(provider.toLocaleLowerCase())
  );
};

export const getCoursesOther = () => {
  const providers = ["Edx", "Skillshare", "Coursera", "Udemy"];

  return courses.filter((course) => !providers.includes(course.provider));
};
