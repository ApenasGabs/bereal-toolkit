type ProcessFilesResponse =
  | { original: string; converted: string; status: "success" }
  | { original: string; error: string; status: "failed" };

export default ProcessFilesResponse;
