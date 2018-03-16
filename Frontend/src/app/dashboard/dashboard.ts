import { User } from '../user/user';
import { Consortium } from '../consortium/consortium';
import { Institution } from '../institution/institution';
import { Workshop } from '../workshop/workshop';

export interface Dashboard {
    user: User,
    consortia: Array<Consortium>,
    institutions: Array<Institution>,
    workshops: Array<Workshop>
}
