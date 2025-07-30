export interface TDownloadFile {
  downloadedFileName: string;
}

export interface TReportDownloadedUser {
  name: string;
  phone: string;
  email: string;
  downloadedFiles: TDownloadFile[];
}
