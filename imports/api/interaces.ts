export interface NavLink {
    url: string
    name: string
}

export interface RegisterInfo {
    username: string
    email: string
    password: string
}

export interface LoginInfo {
    username:string
    password:string
    
}

export interface FormInput {
    label: string
    type:string
    name: string
}

export interface PostData {
    author: string
    content: string
    imageUrl?: string;
    gifUrl?: string;
}
export type AuthField = keyof RegisterInfo | keyof LoginInfo;
