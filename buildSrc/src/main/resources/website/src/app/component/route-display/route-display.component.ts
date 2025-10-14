import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from "@angular/core";
import {FormatColorPipe} from "../../pipe/formatColorPipe";
import {ThemeService} from "../../service/theme.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
	selector: "app-route-display",
	imports: [
		FormatColorPipe,
		TooltipModule,
	],
	templateUrl: "./route-display.component.html",
	styleUrl: "./route-display.component.css",
})
export class RouteDisplayComponent implements AfterViewInit {
	private readonly themeService = inject(ThemeService);

	@Input() colorAbove?: number;
	@Input() colorBelow?: number;
	@Input({required: true}) isStation = false;
	@Input({required: true}) icons: { icon: string, offset: number, tooltip?: string }[] = [];
	@ViewChild("text") private readonly textRef!: ElementRef<HTMLDivElement>;
	private height = 0;

	ngAfterViewInit(): void {
		new ResizeObserver(entries => entries.forEach(entry => this.height = entry.target.clientHeight)).observe(this.textRef.nativeElement);
	}

	getHeight() {
		return this.height;
	}

	isDarkTheme() {
		return this.themeService.isDarkTheme();
	}
}
