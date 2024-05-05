type BaseRequest<T> = (params?: T) => Promise<Response>;

type SuccessResponse<V> = {
  code: "success";
  data: V;
};

type ErrorResponse<E> = {
  code: "error";
  error: E;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export const requestHandler =
  <T, V, E = Error>(request: BaseRequest<T>) =>
  async (params?: T): BaseResponse<V, E> => {
    try {
      const response = await request(params);
      const { data }: V = await response.json();
      return { code: "success", data };
    } catch (e) {
      return { code: "error", error: e } as ErrorResponse<E>;
    }
  };
