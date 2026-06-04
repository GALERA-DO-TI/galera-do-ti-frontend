export type IApplication = {
  email: string;
};

export type InitialStateProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  application: IApplication | null;
};
