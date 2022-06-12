<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryFormType;
use App\Repository\CategoryRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CategoryController extends AbstractController
{
    #[Route('/category', name: 'app_category')]
    public function index(CategoryRepository $catRepo): Response
    {
        // $textAuto = new Category();
        // $form = $this->createForm(CategoryFormType::class, $textAuto);
        return $this->render('category/index.html.twig', [
            'categories' => $catRepo->findAll(),
            // 'form' => $form->createView(), 

        ]);
    }
    
    #[Route('/ajout', name: 'app_ajout')]
    public function ajout(Request $request,ManagerRegistry $doctrine): Response
    {
        $cat = new Category();
        $form = $this->createForm(CategoryFormType::class, $cat);
        $form->handleRequest($request);
        // dump($form->isSubmitted(), $form->isValid());die;
        if ($form->isSubmitted() && $form->isValid()) {

            $em = $doctrine->getManager();
            $em->persist($cat);
            $em->flush();

            return $this->redirectToRoute('app_collection');

        }
        return $this->render('category/ajout.html.twig', [
            
            'form' => $form->createView(), 

        ]);
    }
}
