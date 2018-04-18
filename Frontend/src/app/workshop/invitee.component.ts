import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'invitee',
    templateUrl: 'invitee.component.html'
})
export class InviteeComponent {
    @Input('group')
    public inviteeForm: FormGroup;
}
