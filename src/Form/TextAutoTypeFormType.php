<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\TextAuto;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class TextAutoTypeFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('type', ChoiceType::class, [
            'choices'  => [
                'chat' => 'chat',
                'mail' => 'mail',
                'divers' => 'divers',
            ],
            'choice_attr' => function($choice, $key, $value) {
                // adds a class like attending_yes, attending_no, etc
                return ['class' => 'category'];
            },
            'expanded' => true,
          'multiple' => false,
        ])
            ->add('title')
            // ->add('text')
            // ->add('User')
            ->add('category',EntityType ::class,[
                'mapped' => true,
                'class' => Category::class,
                'choice_label' => 'name',
                'placeholder' => 'choisir une catégorie',
                'label' => 'catégories'
            ])
            ->add('valder',SubmitType::class)
        ;
        
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => TextAuto::class,
            "allow_extra_fields" => true
        ]);
    }
}
