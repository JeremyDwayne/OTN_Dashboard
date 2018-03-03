export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public institution_id: number,
    public role: number,
    public type: string,
    public created_at?: string,
    public updated_at?: string,
  ){}
}
