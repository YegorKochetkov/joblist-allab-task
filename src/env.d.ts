/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly JOBS_API_TOKEN: string;
	readonly GOOGLE_MAP_API_KEY: string;
	readonly GOOGLE_MAP_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
