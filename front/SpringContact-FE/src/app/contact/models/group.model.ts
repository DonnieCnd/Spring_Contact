import { ContactModel } from './contact.model';

export class GroupModel {
    id: string;
    name: string;
    contacts: ContactModel[];
}