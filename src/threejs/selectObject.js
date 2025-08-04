import { Go } from "../gameObjects";
import { outlineObject, removeOutline } from "./outlineObject";

export const selectObject = (s) => {

    window.addEventListener("pointermove", () => {
    s.raycaster.setFromCamera(s.mouse, s.camera);
     const intersects = s.raycaster.intersectObjects(s.scene.children, true);

     if (intersects.length > 0){
       const hovered = intersects[0].object;

       if(hovered != s.selectedObject){
        s.selectedObject = hovered;
        // console.log("hovered: " + hovered.name);
        removeOutline(s.outlinedObject);
        return;
       }

       if(hovered.name == Go.CHAIR ||
        hovered.name == Go.COMPUTER_1 ||
        hovered.name == Go.COMPUTER_2
       )
       {
        s.selectedObject = hovered;
        outlineObject(hovered);
        s.outlinedObject = hovered;
       }
     }
  })
}