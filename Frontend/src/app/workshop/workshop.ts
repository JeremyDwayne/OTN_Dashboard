export class Workshop {
  constructor(
    public id?: number,
    public name?: string,
    public institution_id?: number,
    public additional_location_info?: string,
    public starts_at?: string,
    public duration?: number,
    public stipend_cents?: number,
    public stipend_currency?: string,
    public sign_up_deadline?: string,
    public attendee_limit?: number,
    public review_deadline?: string,
    public facilitator_id?: number,
    public created_at?: string,
    public updated_at?: string,
    public slug?: string
  ){}
}
