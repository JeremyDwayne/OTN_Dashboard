export class Institution {
  constructor(
    public id?: number,
    public name?: string,
    public address_line_1?: string,
    public address_line_2?: string,
    public city?: string,
    public state?: string,
    public zip?: number,
    public consortium_id?: number,
    public created_at?: string,
    public updated_at?: string,
    public slug?: string
  ){}
}
