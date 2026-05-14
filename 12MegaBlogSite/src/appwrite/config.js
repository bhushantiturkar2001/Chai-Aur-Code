import axios from "axios";
import conf from "../conf/conf.js";

// axios instance with base URL
const api = axios.create({
    baseURL: conf.baseUrl,
});

// attach JWT token to every request automatically
api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = "Bearer " + token;
    }
    return req;
});

export class Service {

    // ─── ARTICLES ────────────────────────────────────────────────

    // POST /api/articles  →  { title, slug(ignored), content, featuredImage(fileName), status, userId }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const res = await api.post("/articles", {
                title,
                content,
                image: featuredImage,   // fileName string from file upload
                status,
                userId,
            });
            // normalize to match Appwrite-style shape used in components
            return this._normalize(res.data);
        } catch (error) {
            console.log("Service :: createPost :: error", error);
        }
    }

    // PUT /api/articles/{id}  →  { title, content, image, status }
    async updatePost(id, { title, content, featuredImage, status }) {
        try {
            const res = await api.put(`/articles/${id}`, {
                title,
                content,
                image: featuredImage,
                status,
            });
            return this._normalize(res.data);
        } catch (error) {
            console.log("Service :: updatePost :: error", error);
        }
    }

    // DELETE /api/articles/{id}
    async deletePost(id) {
        try {
            await api.delete(`/articles/${id}`);
            return true;
        } catch (error) {
            console.log("Service :: deletePost :: error", error);
            return false;
        }
    }

    // GET /api/articles/{id}
    async getPost(id) {
        try {
            const res = await api.get(`/articles/${id}`);
            return this._normalize(res.data);
        } catch (error) {
            console.log("Service :: getPost :: error", error);
            return false;
        }
    }

    // GET /api/articles?status=active  (default: only active posts)
    async getPosts(queries = []) {
        try {
            // queries array is kept for API compatibility with Appwrite-style calls
            // we pass status=active by default to match Appwrite behaviour
            const status = queries.length === 0 ? "active" : undefined;
            const res = await api.get("/articles", {
                params: status ? { status } : {},
            });
            return {
                documents: res.data.map((a) => this._normalize(a)),
            };
        } catch (error) {
            console.log("Service :: getPosts :: error", error);
            return false;
        }
    }

    // ─── FILES ───────────────────────────────────────────────────

    // POST /api/files/upload  →  multipart  →  returns fileName string
    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await api.post("/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // return Appwrite-style object so PostForm works unchanged
            return { $id: res.data };
        } catch (error) {
            console.log("Service :: uploadFile :: error", error);
            return false;
        }
    }

    // DELETE /api/files/{fileName}
    async deleteFile(fileName) {
        try {
            await api.delete(`/files/${fileName}`);
            return true;
        } catch (error) {
            console.log("Service :: deleteFile :: error", error);
            return false;
        }
    }

    // GET /api/files/{fileName}  →  returns full URL for <img src>
    getFilePreview(fileName) {
        if (!fileName) return "";
        return `${conf.baseUrl}/files/${fileName}`;
    }

    // ─── HELPER ──────────────────────────────────────────────────

    // Normalize backend Article shape → Appwrite-style shape
    // Backend:  { id, title, content, image, status, userId }
    // Appwrite: { $id, title, content, featuredImage, status, userId }
    _normalize(article) {
        if (!article) return null;
        return {
            $id: String(article.id),
            title: article.title,
            content: article.content,
            featuredImage: article.image,   // fileName string
            status: article.status,
            userId: article.userId,
        };
    }
}

const service = new Service();
export default service;
