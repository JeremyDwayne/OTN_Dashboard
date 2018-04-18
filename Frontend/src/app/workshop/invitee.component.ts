import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'invitee',
    templateUrl: 'invitee.component.html'
})
export class InviteeComponent {
    submitted: boolean = false;
    @Input('group')
    public inviteeForm: FormGroup;
}
