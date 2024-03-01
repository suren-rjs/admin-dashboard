import axios, { AxiosResponse, AxiosError } from "axios";
import { User, Register, Login, Orders, Coupon } from "./models/user";

const baseUrl = "https://shofy-backend-seven.vercel.app/api";

class AdminApiService {
  private static instance: AdminApiService | null = null;

  constructor() {}

  public static getInstance(): AdminApiService {
    if (!AdminApiService.instance) {
      AdminApiService.instance = new AdminApiService();
    }
    return AdminApiService.instance;
  }
  async register(register: Register): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.post<User>(
        `${baseUrl}/admin/register`,
        register
      );
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  }

  async login(login: Login): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.post<User>(`${baseUrl}/admin/login`, login);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getOrders(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${baseUrl}/order/orders`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getProducts(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${baseUrl}/product/all`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async addProduct(product: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${baseUrl}/product/add`, product);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getCoupons(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${baseUrl}/coupon/`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getBrands(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${baseUrl}/brand/all`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async addBrands(brand: any): Promise<AxiosResponse> {
    try {
      return await axios.post(`${baseUrl}/brand/add`, brand);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async editBrands(brand: any): Promise<AxiosResponse> {
    try {
      return await axios.patch(`${baseUrl}/brand/edit/` + brand._id, brand);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getBrandById(id: string): Promise<AxiosResponse> {
    try {
      return await axios.get(`${baseUrl}/brand/get/` + id);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async deleteBrandById(id: string): Promise<AxiosResponse> {
    try {
      return await axios.delete(`${baseUrl}/brand/delete/` + id);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async getCategories(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${baseUrl}/category/all`);
    } catch (error) {
      throw error.response?.data;
    }
  }

  async uploadImage(selectedFile: any) {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(baseUrl + "/cloudinary/add-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
}

export default AdminApiService.getInstance();
