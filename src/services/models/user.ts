export interface User {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  role: string;
  status: string;
  password: string;
}

export interface Orders {
  success: boolean;
  data: any[];
}

export interface Coupon {
  title: string;
  logo: string;
  couponCode: string;
  startTime: Date;
  endTime: Date;
  discountPercentage: number;
  minimumAmount: number;
  productType: string;
  status: string;
}
