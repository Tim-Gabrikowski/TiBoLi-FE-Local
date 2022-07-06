import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from '../message.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private tokenService: TokenStorageService,
		private messageService: MessageService
	) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		var minPerm = route.data.perm_group;
		var user = this.tokenService.getUser();
		if (user.perm_group >= minPerm) {
			return true;
		} else {
			this.messageService.add('Du hast hier keinen Zugriff');
			return false;
		}
	}
}
