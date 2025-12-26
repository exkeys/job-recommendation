import { useState, useCallback } from 'react';
import { loadProblemImage, loadProblemImages, hasImage } from '../data/problemImages';

interface UseImageLoaderReturn {
  displayImage: string | null;
  displayImages: string[];
  imageHeight: number | null;
  setImageHeight: (height: number | null) => void;
  load: () => Promise<void>;
}

/**
 * 문제 이미지를 로드하는 커스텀 훅
 */
export function useImageLoader(
  selectedProblem: string,
  selectedImage: string | null
): UseImageLoaderReturn {
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      // 문제가 변경되면 이미지 높이 초기화
      setImageHeight(null);

      if (hasImage(selectedProblem)) {
        // 여러 이미지가 있는 경우 모두 로드
        const images = await loadProblemImages(selectedProblem);
        if (images.length > 0) {
          if (images.length === 1) {
            // 이미지가 1개면 기존 방식 유지
            setDisplayImage(images[0]);
            setDisplayImages([]);
          } else {
            // 여러 이미지면 배열로 저장
            setDisplayImage(null);
            setDisplayImages(images);
          }
          return;
        }

        // fallback: 단일 이미지 로드
        const image = await loadProblemImage(selectedProblem);
        if (image) {
          setDisplayImage(image);
          setDisplayImages([]);
          return;
        }
      }

      if (selectedImage) {
        setDisplayImage(selectedImage);
        setDisplayImages([]);
        return;
      }

      setDisplayImage(null);
      setDisplayImages([]);
    } catch {
      setDisplayImage(null);
      setDisplayImages([]);
    }
  }, [selectedProblem, selectedImage]);

  return {
    displayImage,
    displayImages,
    imageHeight,
    setImageHeight,
    load,
  };
}

