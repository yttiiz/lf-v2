import { lazy, Suspense, useState } from "react";
import type { Area } from "react-easy-crop";

const Cropper = lazy(() => import("react-easy-crop"));

export const ImageCropper = ({
	image,
	setCroppedArea,
}: {
	image: string | ArrayBuffer | undefined | null;
	setCroppedArea: React.Dispatch<React.SetStateAction<Area | null>>;
}) => {
	const isImageOk = !!image && typeof image === "string";

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
		setCroppedArea(croppedAreaPixels);
	};

	return isImageOk ? (
		<Suspense fallback={<p>Chargement...</p>}>
			<div className="flex h-[70dvh] w-full sm:h-[500px]">
				<Cropper
					image={image}
					crop={crop}
					aspect={1 / 1}
					zoom={zoom}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
					style={{
						containerStyle: {
							width: "100%",
							height: "100%",
							position: "relative",
							borderRadius: "8px",
						},
					}}
				/>
			</div>
		</Suspense>
	) : (
		<p>Aucune image à afficher !</p>
	);
};
